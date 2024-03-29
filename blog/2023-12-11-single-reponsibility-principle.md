---
slug: single-responsibility-principle
title: Single Resonsibility Principle (SRP) là gì?
description: Single Responsibility Principle (SRP) là nguyên tắc đơn nhiệm. Mỗi class chỉ nên chịu trách nhiệm về một và chỉ một nhiệm vụ cụ thể.
authors: [anhtuank7c]
image: /img/single-responsibility-principle.webp
tags: [Solid Principles, Single Responsibility Principle]
---

![single responsibility principle](/img/single-responsibility-principle.webp)
Tiếp diễn chuỗi bài viết về [SOLID principle](https://anhtuank7c.dev/blog/solid-principles), bài này mình sẽ đi sâu vào **Single Responsibility Principle (SRP)**

<!--truncate-->

## Single Responsibility Principle (SRP) là gì?

SRP được dịch một cách ngắn gọn là **nguyên tắc đơn nhiệm**. Mỗi class chỉ nên chịu trách nhiệm về một và chỉ một nhiệm vụ cụ thể.

Nguyên tắc này được [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) giới thiệu năm 2003, ông còn hay được gọi với cái tên **Uncle Bob**

Vì sao lại đơn nhiệm?

Vì nó đơn giản, dễ hiểu và dễ nắm bắt, dễ dàng bảo trì và mở rộng, đồng thời dễ dàng trong việc viết unit test.

## Ví dụ

Dưới dây là ví dụ về class vi phạm (violate) nguyên tắc đơn nhiệm (Single Responsibility Principle)

```typescript
// Violating SRP

class OrderProcessor {

    checkout(total: number, address: string) {
      const result = this.processPayment(total)
      if (result) {
	      this.processShipping(address)
      }
    }

    processPayment(total: number): boolean {
      console.log('processing payment with paypal or momo', total)
      return true
    }

    processShipping(address: string) {
	console.log('processing shipping', address)
    }
}
```

Class `OrderProcessor` bên trên đang đảm nhiệm 03 nhiệm vụ (checkout, processPayment và processShipping), vậy class này đã vi phạm nguyên tắc đơn nhiệm.

Chúng ta sẽ thiết kế lại class này tuân theo (adhere) nguyên tắc đơn nhiệm nhé

```typescript
// Adhering SRP

class PaymentProcessor {
    process(total: number): boolean {
        console.log('processing payment with paypal or momo', total)
        return true
    }
}

class ShipppingProcessor {
    process(address: string): void {
        console.log('processing shipping', address)
    }
}

class OrderProcessor {
  constructor(
    private payment: PaymentProcessor,
    private shipping: ShippingProcessor
  ) {}

  checkout(total: number, address: string) {
    const result = this.payment.process(total);
    if (result) {
      this.shipping.process(address);
    }
  }
}

```

Mình tách nhiệm vụ process payment ra một class độc lập là `PaymentProcessor`, làm tương tự với process shipping mình tạo ra class `ShipppingProcessor`. Vậy là 02 class này đã tuân theo nguyên tắc đơn nhiệm.

Tiếp theo đó, mình chỉ định class `OrderProcessor` chỉ làm một nhiệm vụ duy nhất là `checkout` , việc payment diễn ra như thế nào thì để cho `PaymentProcessor` đảm nhiệm, với kết quả payment nhận được, mình sẽ tiếp tục cho class `ShippingProcessor` đảm nhiệm việc ship hàng.

Vậy class `OrderProcessor` cũng đã tuân theo nguyên tắc đơn nhiệm rồi.

## Unit test

Việc viết unit test bây giờ trở nên cực kỳ dễ dàng vì chúng ta đã phân tách ra 03 class, mỗi class đảm nhiệm một nhiệm vụ riêng biệt.

```typescript
// PaymentProcessor
it('able to process payment', () => {
	const payment = new PaymentProcessor()
	expect(payment.process(1000)).toBe(true)
})
```

```typescript
// ShipppingProcessor
it('able to process shipping', () => {
	const shipping = new ShipppingProcessor()
	expect(shipping.process("Hanoi, Vietnam")).not.toThrow();
})
```

```typescript
// OrderProcessor
it('able to checkout', () => {
	const payment = new PaymentProcessor()
	const shipping = new ShipppingProcessor()
	const orderProcesser = new OrderProcessor(payment, shipping)
	expect(orderProcesser.process(1000, "Hanoi, Vietnam")).not.toThrow();
})
```

Các bạn xem, chúng ta vừa có code tường minh, dễ nắm bắt, lại dễ dàng viết unit test.

Nếu như bạn bị lỗi ở khâu payment, bạn biết ngay rằng mình sẽ cần tìm class Payment để kiểm tra mà không cần đọc code dài dòng khó hiểu nữa.

 Trong ví dụ trên mình sử dụng `jest` để viết unit test, bạn có thể tìm thấy tài liệu tại đây: [Getting Started · Jest (jestjs.io)](https://jestjs.io/docs/getting-started)

## Hỏi đáp

**Q: Làm thế nào để đảm bảo code của bạn tuân theo nguyên tắc đơn nhiệm (Single Responsibility Principle)?**

A: Để đảm bảo code tuân theo nguyên tắc đơn nhiệm, tôi thực hiện các bước sau:

* Đảm bảo rằng mỗi class chỉ làm một nhiệm vụ duy nhất. Nếu có nhiều hơn một nhiệm vụ thì chứng tỏ cần phải phân tách ra nhỏ hơn nữa.
* Mỗi class chỉ có duy nhất một lý do để thay đổi.
* Mỗi class chỉ làm duy nhất một việc, và làm việc ấy thật tốt.

## Kết luận

Tuân theo nguyên tắc đơn nhiệm có nhiều lợi ích như: code đơn giản, dễ đọc, dễ nắm bắt, dễ viết unit test.

Tuy nhiên đi kèm đó là việc số lượng file phát sinh ra cũng lớn.

Nếu bạn cảm thấy bài này hữu ích thì hãy chia sẻ, lan tỏa tới cộng đồng nhé.

Nếu bạn phát hiện sai sót, đừng ngần ngại báo lại cho mình qua các kênh mạng xã hội bên dưới website.

Các bài viết tiếp nối chủ đề SOLID principles sẽ sớm được cập nhật.

Chúc bạn ngày mới tốt lành.
