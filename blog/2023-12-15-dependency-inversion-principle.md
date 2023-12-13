---
slug: dependency-inversion-principle
title: Dependency Inversion Principle (DIP)
description: Tiếp nối chuỗi bài SOLID principles, bài này chúng ta cùng tìm hiểu nguyên tắc đảo ngược phụ thuộc (dependency inversion principle) là gì và nó quan trọng ra sao nhé.
image: /img/dependency-inversion-principle.webp
authors: [anhtuank7c]
tags: [Dependency Inversion Principle, Solid Principles]
---

![Dependency Inversion Principle](/img/dependency-inversion-principle.webp)

Tiếp nối chuỗi bài SOLID principles, bài này chúng ta cùng tìm hiểu nguyên tắc đảo ngược phụ thuộc (dependency inversion principle) là gì và nó quan trọng ra sao nhé.

Đây là nguyên tắc cuối cùng trong bộ 05 nguyên tắc SOLID.

<!--truncate-->

## Dependency Inversion Principle (DIP) là gì?

Nguyên tắc đảo ngược phụ thuộc (DIP) là nguyên tắc mà trong đó nhấn mạnh **module cấp cao** chỉ được phụ thuộc vào các lớp trừu tượng (abstraction/interface) của **module cấp thấp**.

Nguyên tắc này được giới thiệu bởi [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) hay còn gọi là **Uncle Bob**.

Có thể thấy **Uncle Bob** đã đóng góp 3/5 nguyên tắc trong bộ [SOLID principles](https://anhtuank7c.dev/blog/solid-principles) bao gồm:

* [Single Resonsibility Principle (SRP)](https://anhtuank7c.dev/blog/single-responsibility-principle)
* [Interface Segregation Principle (ISP)](https://anhtuank7c.dev/blog/interface-segregation-principle)
* [Dependency Inversion Principle (DIP)](https://anhtuank7c.dev/blog/dependency-inversion-principle)

Trong định nghĩa trên có 02 điểm chưa rõ ràng, module cấp cao là gì? module cấp thấp là gì?

### Module cấp cao (high-level modules) là gì?: 

Là các module mà trong đó nó phụ thuộc vào các module cấp thấp khác để implement business logic với mục đích cụ thể như xử lý thanh toán giỏ hàng, book lịch họp etc...

```typescript
// high-level module
class OrderProcessorService {
    // PaymentRepository and ShippingRepository are injected too loose coupled
    constructor(private payment: PaymentRepository, private shipping: ShippingRepository) { }

    checkout() {
        const result = this.payment.process()
        if (result) {
            this.shipping.process()
        }
    }
}
```

Ở ví dụ này module **OrderProcessorService** là module cấp cao, nó phụ thuộc vào module cấp thấp hơn là **PaymentRepository** và **ShippingRepository** (trình bày bên dưới).

### Module cấp thấp (low-level modules) là gì?:

Ngược lại với module bậc cao, module cấp thấp là các module mà trong đó nó có thể hoạt động độc lập, không phụ thuộc vào bất cứ module nào khác. Nó có thể dễ dàng tái sử dụng ở bất kỳ đâu mà không bị ràng buộc vào phụ thuộc nào khác.

```typescript
// abstraction
interface PaymentRepository {
    process(): void
}

// abstraction
abstract class ShippingRepository {
    abstract process(): void
}

// low-level module
class PaypalPaymentRepository implements PaymentRepository {
    process(): void {
      	// call Paypal API
        console.log('Processing paypal payment')
    }
}

// low-level module
class AirplaneShippingRepository extends ShippingRepository {
    process(): void {
      	// call Delivery API
        console.log('Processing shipping with A320 Airplane')
    }
}
```

Ở ví dụ này, các module cấp thấp như **PaymentRepository**, **ShippingRepository** không phụ thuộc vào bất cứ module nào khác, vì thế 02 modules này rất linh hoạt trong việc tái sử dụng.

Hãy làm rõ hơn vấn đề qua ví dụ sau

## Ví dụ vi phạm nguyên tắc đảo ngược phụ thuộc (DIP)

```typescript
// Violating DIP

// concrete implemented class
class SMSSender {
    send(message: string): void {
        console.log(`sending SMS: ${message}`)
    }
}

class NotificationService {
    // violate since NotificationService depend on concrete implementation of SMSSender
		private sender = new SMSSender(); // tight coulped

    send(message: string): void {
        this.sender.send(message)
    }
}

const notiService = new NotificationService()
```

Ở ví dụ này, high-level module **NotificationService** phụ thuộc vào low-level module **SMSSender**  trong khi nguyên tắc chỉ ra rằng module bậc cao chỉ được phụ thuộc vào lớp trừu tượng (abstract/interface) của module bậc thấp.

Việc phụ thuộc vào một module/class đã được implement chi tiết là vi phạm nguyên tắc.

## Ví dụ tuân theo nguyên tắc đảo ngược phụ thuộc (DIP)

Chúng ta hãy thiết kế lại ví dụ trên để tuân theo nguyên tắc đảo ngược phụ thuộc nhé.

```typescript
// Adhering DIP

interface SenderRepository {
    send(message: string): void
}

// low-level module
class SmsSenderRepository implements SenderRepository {
    send(message: string): void {
        // calling sms api
    }
}

// low-level module
class EmailSenderRepository implements SenderRepository {
    send(message: string): void {
        // calling smtp
    }
}

// high-level module
class NotificationService {
    // adhering since NotificationService depend on an abstraction of low-level abstraction/interface
    constructor(private sender: SenderRepository) { } // loose coupled by using dependency injection

    send(message: string): void {
        this.sender.send(message)
    }
}

const smsSenderRepository = new SmsSenderRepository()
const notiServiceSMS = new NotificationService(smsSenderRepository)

const emailSenderRepository = new EmailSenderRepository()
const notiServiceEmail = new NotificationService(emailSenderRepository)
```

Ở ví dụ này mình đã triển khai interface **SenderRepository**, class **NotificationService** nay chỉ phụ thuộc vào interface **SenderRepository**, bạn có thể truyền bất cứ class nào implement interface **SenderRepository** đều được.

Chúng ta sử dụng kỹ thuật tiêm vào sự phụ thuộc (Dependency injection technique) để truyền bất cứ class nào implement interface **SenderRepository** vào class **NotificationService**

## Một vài khái niệm nhắc đến trong bài:

* **Dependency injection**: Là một kỹ thuật mà trong đó các class hoặc module nhận instance/object của class phụ thuộc thông qua constructor thay vì khởi tạo instance đó trong class chỉ định.

  ```typescript
  interface PaymentRepository {
  	...
  }
  
  // low-level module
  class MomoPaymentRepository implements PaymentRepository {
  	...
  }
  
  // high-level module
  class ShoppingCartService {
  	constructor(private payment: PaymentRepository) {} // depend on PaymentRepository interface
  }
  
  const momoPaymentRepo = new MomoPaymentRepository()
  const shoppingCartService = new ShoppingCartService(momoPaymentRepo) // inject dependency momoPaymentRepo into class via constructor
  ```

* **tight coupled**: Liên kết chặt chẽ. Điều này không tốt, các module phụ thuộc chặt chẽ sẽ làm giảm khả năng mở rộng, nâng cấp.

  Xét ví dụ sau

  ```typescript
  class PaymentRepository implements BasePaymentRepository {
  	...
  }
  
  class OrderProcessorService {
  	private payment = new PaymentRepository() // tight coupled
  }
  
  const orderProcessorService = new OrderProcessorService()
  ```

* **loose coupled**: Liên kết lỏng lẻo. Việc này khiến các module trở nên độc lập hơn, dễ mở rộng và nâng cấp hơn.

  Thiết kế lại ví dụ bên trên

  ```typescript
  class PaymentRepository implements BasePaymentRepository {
  	...
  }
  
  class OrderProcessorService {
  	constructor(private payment: BasePaymentRepository) {} // loose coupled
  }
  
  const paymentRepository = new PaymentRepository()
  const orderProcessorService = new OrderProcessorService(paymentRepository) // dependency injection paymentRepository
  ```

## Unit test

Codebase tuân theo SOLID principles luôn luôn nhấn mạnh tính dễ bảo trì, linh động và khả năng test cao. Vì thế mình luôn luôn cung cấp unit test để trình diễn khả năng này.

```typescript
describe("SmsSenderRepository", () => {
    it("able to send SMS", () => {
        const smsSenderRepo = new SmsSenderRepository()
        expect(smsSenderRepo.send("test")).not.toThrow()
    })
})

describe("EmailSenderRepository", () => {
    it("able to send email", () => {
        const emailSenderRepo = new EmailSenderRepository()
        expect(emailSenderRepo.send("test")).not.toThrow()
    })
})

describe("NotificationService", () => {
    it("able to send sms", () => {
        const smsSenderRepository = new SmsSenderRepository()
        const notiServiceSMS = new NotificationService(smsSenderRepository)
        expect(notiServiceSMS.send("test")).not.toThrow()
    })

    it("able to send email", () => {
        const emailSenderRepository = new EmailSenderRepository()
        const notiServiceEmail = new NotificationService(emailSenderRepository)
        expect(notiServiceEmail.send("test")).not.toThrow()
    })
})
```

## Hỏi đáp

**Q: Làm sao để ứng dụng nguyên tắc đảo ngược phụ thuộc vào code của bạn?**

A: Để ứng dụng nguyên tắc đảo ngược phụ thuộc, tôi làm theo các bước sau:

* Tạo ra các module cấp cao phụ thuộc vào lớp trừu tượng chứ không phụ thuộc vào lớp cụ thể.
* Tạo ra các module cấp thấp implements/extends lớp trừu tượng mà module cấp cao phụ thuộc vào.
* Sử dụng kỹ thuật dependency injection để cung cấp object của module cấp thấp cho module cấp cao.

## Kết luận

Nguyên tắc đảo ngược phụ thuộc (Dependency Inversion Principle) giúp chúng ta thiết kế ra các module/class theo hướng dễ dàng mở rộng và không bị ràng buộc chặt chẽ vào module khác.

Đây là cũng nguyên tắc cuối cùng trong bộ 05 nguyên tắc SOLID. Mong các bạn đọc kỹ từng bài và thực hành thuần thục hơn.

Nếu bạn phát hiện sai sót, đừng ngần ngại báo lại cho mình qua các kênh mạng xã hội bên dưới website.

Tiếp nối chủ đề [SOLID principles](https://anhtuank7c.dev/blog/solid-principles), bài viết tiếp theo mình sẽ tạo ra một ứng dụng cơ bản ứng dụng các nguyên tắc SOLID để các bạn có cái nhìn tổng thể.

Chúc bạn ngày mới tốt lành, nếu thấy bài viết hữu ích đừng quên chia sẻ và lan tỏa nhé.