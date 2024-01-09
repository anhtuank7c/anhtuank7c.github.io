---
slug: liskov-substitution-principle
title: Liskov Substitution Principle (LSP) là gì?
description: Tiếp nối chuỗi bài viết SOLID principles, hôm nay chúng ta sẽ tìm hiểu về Nguyên tắc thay thế Liskov (Liskov Substitution Principle)
image: /img/liskov-substitution-principle.webp
authors: [anhtuank7c]
tags: [Liskov Substitution Principle, Solid Principles]
---

![Liskov Substitution Principle](/img/liskov-substitution-principle.webp)

Tiếp nối chuỗi bài viết [SOLID principles](https://anhtuank7c.dev/blog/solid-principles), hôm nay chúng ta sẽ tìm hiểu về Nguyên tắc thay thế Liskov (Liskov Substitution Principle)

<!--truncate-->

## Liskov Substitution Principle (LSP) là gì?

Nếu **S** là kiểu con của **T** thì các đối tượng kiểu **T** trong chương trình có thể được thay thế bằng các đối tượng kiểu **S** mà ***không làm thay đổi*** bất kỳ thuộc tính/hành vi mong muốn nào của chương trình.

Hay nói cách khác, Liskov Substitution Principle định nghĩa ra một hợp đồng mà các lớp dẫn xuất (derived classes) phải tuân thủ để có thể thay thế thực sự cho các lớp cơ sở của chúng.

### Mục tiêu của LSP

* **Khả năng thay thế**: đối tượng (object) của lớp dẫn xuất có thể thay thế các đối tượng của lớp cơ sở mà không ảnh hưởng tới tính chính xác của chương trình. Điều này cho phép đa hình (polymorphism) và tăng cường tính linh hoạt của chương trình.
* **Bảo tồn hành vi**: các lớp dẫn xuất nên duy trì hoặc mở rộng hành vi của lớp cơ sở.
* **Dễ dàng hoán đổi**: các lớp dẫn xuất dễ dàng hoán đổi cho lớp cơ sở trong mọi ngữ cảnh. Điều này thúc đẩy mức trừu tượng cao, và cho phép viết mã code được viết theo cách độc lập và triển khai cụ thể. (specific concrete implementation)
* **Tính nhất quán**: LSP giúp tạo ra hành vi nhất quán và có thể đoán trước được trong hệ thống phân cấp của các lớp. Nó ngăn chặn tác dụng phụ không mong muốn hoặc ngăn chặn thay đổi hành vi khi sử dụng các lớp dẫn xuất.

Nguyên tắc thay thế Liskov được [Barbara Liskov](https://en.wikipedia.org/wiki/Barbara_Liskov) giới thiệu trong một hội nghị năm 1987.

## Ví dụ

Hãy tìm hiểu sâu hơn về nguyên tắc này qua ví dụ sau

### Vi phạm nguyên tắc thay thế Liskov

```typescript
// Violating LSP
class Rectangle {
    protected width: number = 0
    protected height: number = 0

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    // Violates LSP by changing behavior
    setHeight(height: number) {
        this.height = height;
        this.width = height;
    }

    // Violates LSP by changing behavior
    setWidth(width: number) {
        this.height = width;
        this.width = width;
    }
}

function printArea(shape: Rectangle): void {
    shape.setWidth(5);
    shape.setHeight(10);
    console.log(`Area: ${shape.area()}`);
}

const rect = new Rectangle()
const square = new Square()
printArea(rect) // 50 correct
printArea(square) // 100 => What the heck is that?
```

Ở ví dụ này mình đã ép 2 cạnh *width* và *height* bằng nhau khi *setWidth*, *setHeight* trong class Square. Hành vi *setWidth*, *setHeight* của lớp cơ sở (class Rectangle) đã bị thay đổi.

Điều này rõ ràng là đã vi phạm nguyên tắc Liskov Substitution.

### Tuân theo nguyên tắc thay thế Liskov

Chúng ta hãy cùng thiết kế lại các class trong ví dụ trên nhé

```typescript
// Adhering to LSP with an abstract class
abstract class Shape {
    protected width: number = 0;
    protected height: number = 0;

    setDimensions(width: number, height: number): void {
        this.width = width;
        this.height = height;
    }

    abstract area(): number;
}

class Rectangle extends Shape {
    area(): number {
        return this.width * this.height;
    }
}

class Square extends Shape {
    setDimensions(side: number): void {
        // Adheres to LSP by maintaining the base class behavior
        super.setDimensions(side, side);
    }

    area(): number {
        return this.width * this.height;
    }
}

// Function expecting a Shape
function printArea(shape: Shape): void {
    shape.setDimensions(5, 10);
    console.log(`Area: ${shape.area()}`);
}

// Create an instance of Square (derived class)
const square = new Square();

// Use the function with the derived class object
printArea(square);
// Output: Area: 50 (adheres to LSP)
```

Ở ví dụ này chúng ta bảo tồn được hành vi `setDimensions(number, number)`  và `area()` ở lớp cơ sở (class Shape), bạn có thể mở rộng thêm nữa sang các class như Hexagon, Circle nếu muốn.

## Unit test

Vẫn như mọi khi, unit test là điều không thể thiếu khi tuân theo [SOLID principles](https://anhtuank7c.dev/blog/solid-principles).

```typescript
it('able to calculate square area', () => {
    const square = new Square()
    square.setDimentions(5)
    expect(square.area()).toEqual(25)
})

it('able to replace subtype by base class instance', () => {
    const square = new Square()
    const shape = square as Shape;
    shape.setDimentions(5, 10)
    expect(shape.area()).toEqual(25)
})
```

## Hỏi đáp

**Q: Làm thế nào để ứng dụng nguyên tắc thay thế Liskov trong code của bạn?**

A: Để ứng dụng nguyên tắc thay thế Liskov, tôi làm theo các bước sau:

* Đảm bảo các object của lớp con có thể thay thế bằng object của lớp cha mà không làm thay đổi bất kỳ thuộc tính, hành vi nào của chương trình.
* Các lớp con không được thay đổi hành vi của lớp cha.
* Các lớp con không được đưa ra các ngoại lệ mới mà nó không tồn tại trong lớp cha.

## Tổng kết

Nguyên tắc thay thế Liskov (Liskov Substitution Principle) hữu ích trong việc đảm bảo hành vi luôn nhất quán và dễ dàng đoán trước xuyên suốt chương trình.

Việc thực hành nguyên tắc này giúp bạn nhận thức rõ ràng hơn về tính mạch lạc, tin cậy, đồng thời cũng giúp viết unit test dễ dàng hơn.

Nếu bạn phát hiện sai sót, đừng ngần ngại báo lại cho mình qua các kênh mạng xã hội bên dưới website.

Các bài viết tiếp nối chủ đề [SOLID principles](https://anhtuank7c.dev/blog/solid-principles) sẽ sớm được cập nhật.

Chúc bạn ngày mới tốt lành.

