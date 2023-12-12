---
slug: liskov-substitution-principle
title: Liskov Substitution Principle (LSP)
description: Tiếp nối chuỗi bài viết SOLID principles, hôm nay chúng ta sẽ tìm hiểu về Nguyên tắc thay thế Liskov (Liskov Substitution Principle)
image: /img/liskov-substitution-principle.webp
authors: [anhtuank7c]
tags: [Liskov Substitution Principle, solid principles, software development principle]
---

![Liskov Substitution Principle](/img/liskov-substitution-principle.webp)

Tiếp nối chuỗi bài viết [SOLID principles](https://anhtuank7c.dev/blog/solid-principles), hôm nay chúng ta sẽ tìm hiểu về Nguyên tắc thay thế Liskov (Liskov Substitution Principle)

<!--truncate-->

## Định nghĩa

Đối tượng (object) ở lớp cha (parent class hay superclass) có thể thay thế bằng đối tượng (object) ở lớp con của nó (its subclass) mà không phá vỡ (break) sự đúng đắn (correctness) của chương trình.

Nguyên tắc thay thế Liskov được [Barbara Liskov](https://en.wikipedia.org/wiki/Barbara_Liskov) giới thiệu trong một hội nghị năm 1987.

## Ví dụ

Hãy tìm hiểu sâu hơn về nguyên tắc này qua các ví dụ

### Vi phạm nguyên tắc thay thế Liskov

```typescript
// Violating LSP
class Order {
  constructor(private totalAmount: number) {}

  getTotalAmount(): number {
    return this.totalAmount;
  }

  processOrder(): void {
    console.log(`Processing order with total amount: $${this.totalAmount}`);
  }
}

class DiscountedOrder extends Order {
  constructor(totalAmount: number, private discountPercentage: number) {
    super(totalAmount);
  }

  // vi phạm LSP vì method processOrder đã thay đổi hoàn toàn hành vi so với class Order
  processOrder(): void {
    const discountedAmount = this.getTotalAmount() - (this.getTotalAmount() * this.discountPercentage) / 100;
    console.log(`Processing discounted order with total amount: $${discountedAmount}`);
  }
}
```

Ở ví dụ này, method `processOrder` nguyên bản ở class **Order** chỉ làm một việc duy nhất là console.log, trong khi đó method này bị thay đổi ở class **DiscountedOrder**, cụ thể là tính toán mức giảm giá rồi mới thực hiện console.log

Hành vi bị thay đổi này đã dẫn tới việc vi phạm nguyên tắc thay thế Liskov.

### Tuân theo nguyên tắc thay thế Liskov

Chúng ta hãy cùng thiết kế lại các class trong ví dụ trên nhé

```typescript
// Adhering LSP
class Order {
  constructor(private totalAmount: number) {}

  getTotalAmount(): number {
    return this.totalAmount;
  }

  processOrder(): void {
    console.log(`Processing order with total amount: $${this.totalAmount}`);
  }
}

class DiscountedOrder extends Order {
  constructor(totalAmount: number, private discountPercentage: number) {
    super(totalAmount);
  }

  applyDiscount(): number {
    return this.getTotalAmount() - (this.getTotalAmount() * this.discountPercentage)/100;
  }

  processOrder(): void {
    const discountedAmount = this.applyDiscount()
    console.log(`Processing discounted order with total amount: $${discountedAmount}`);
  }
}

```

Ở ví dụ này, chúng ta tạo thêm method mới là `applyDiscount` , giờ đây hành vi của method `processOrder` đã trở về nguyên bản như ở class Order, việc tính toán giảm giá sẽ do method `applyOrder` xử lý.

Việc tuân theo nguyên tắc thay thế Liskov này giúp bạn tách bạch được logic, việc tính toán giảm giá thực hiện ở method `applyDiscount`, và method `processOrder` giờ đây chỉ làm đúng trách nhiệm của nó là `processOrder` .

Đồng thời hành vi của `processOrder` không hề bị thay đổi dù ở class **Order** hay ở class **DiscountedOrder**.

Hãy thử thiết kế lại ví dụ trên một lần nữa, lần này chúng ta sử dụng abstract class nhé.

```typescript
abstract class Order {
  abstract totalAmount: number
  abstract processOrder(): void
}

class RegularOrder extends Order {
    totalAmount: number;
    
    constructor(totalAmount: number) {
        super()
        this.totalAmount = totalAmount
    }

    processOrder(): void {
      console.log(`Processing order with total amount: $${this.totalAmount}`);
    }
}

class DiscountedOrder extends Order {
    totalAmount: number
    discountPercentage: number
    
    constructor(totalAmount: number, discountPercentage: number) {
        super()
        this.totalAmount = totalAmount
        this.discountPercentage = discountPercentage
    }

    applyDiscount(): number {
        return this.totalAmount - (this.totalAmount * this.discountPercentage) / 100
    }

    processOrder(): void {
        const discountedAmount = this.applyDiscount()
        console.log(`Processing order with total amount: $${discountedAmount}`)
    }
}
const regularOrder = new RegularOrder(100)
regularOrder.processOrder()
// Processing order with total amount: $100

const discountedOrder = new DiscountedOrder(100, 10)
discountedOrder.processOrder()
// Processing order with total amount: $90
```

Ở ví dụ này mình không implement `processOrder` ở abstract class Order nữa mà chuyển sang lớp trừu tượng (abstract class)

Các class kế thừa từ lớp trừu tượng sẽ tự implement logic cho `processOrder` mà không làm ảnh hưởng gì tới tính đúng đắn của class **Order**

## Unit test

Vẫn như mọi khi, unit test là điều không thể thiếu khi tuân theo [SOLID principles](https://anhtuank7c.dev/blog/solid-principles).

```typescript
it('able to process order', () => {
  const order = new Order(100)
  expect(order.processOrder()).not.toThrow()
})

describe('DiscountedOrder', () => {
  it('must apply discount correctly', () => {
    const order = new DiscountedOrder(100, 10)
    expect(order.applyDiscount()).toEqual(90)
  })

  it('able to process discounted order', () => {
    const order = new DiscountedOrder(100, 10)
    expect(order.processOrder()).not.toThrow()
  })
})
```



## Tổng kết

Nguyên tắc thay thế Liskov (Liskov Substitution Principle) hữu ích trong việc đảm bảo hành vi luôn ổn định và thống nhất xuyên suốt chương trình.

Việc thực hành nguyên tắc này giúp bạn nhận thức rõ ràng hơn về tính mạch lạc, tin cậy, đồng thời cũng giúp viết unit test dễ dàng hơn.

Nếu bạn phát hiện sai sót, đừng ngần ngại báo lại cho mình qua các kênh mạng xã hội bên dưới website.

Các bài viết tiếp nối chủ đề [SOLID principles](https://anhtuank7c.dev/blog/solid-principles) sẽ sớm được cập nhật.

Chúc bạn ngày mới tốt lành.

