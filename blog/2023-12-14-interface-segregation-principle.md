---
slug: interface-segregation-principle
title: Interface Segregation Principle (ISP) là gì?
description: Tiếp theo chuỗi bài về SOLID principles, bài này chúng ta sẽ tìm hiểu về nguyên tắc phân tách Interface (ISP) nhé
authors: [anhtuank7c]
image: /img/interface-segregation-principle.webp
tags: [Interface Segregation Principle, Solid Principles]
---

![Interface Segregation Principle (ISP)](/img/interface-segregation-principle.webp)

Tiếp theo chuỗi bài về [SOLID principles](https://anhtuank7c.dev/blog/solid-principles), bài này chúng ta sẽ tìm hiểu về nguyên tắc phân tách Interface nhé

<!--truncate-->

## Interface Segregation Principle (ISP) là gì?

Nguyên tắc phân tách Interface khẳng định rằng **không nên** buộc các entities (như class, module...) phải phụ thuộc vào các phương thức (method) mà nó không sử dụng đến.

Hay giải thích bằng cách khác: Bạn không nên tạo ra interface lớn, mục đích chung chung bao gồm quá nhiều method, hãy ưu tiên tạo ra nhiều interface nhỏ, mục đích cụ thể. Theo đó các class chỉ cần implement các interface mà nó thực sự dùng đến.

Nguyên tắc này được giới thiệu bởi [Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) hay còn gọi là **Uncle Bob**

Nghe có vẻ khó hiểu phải không?

Chúng ta hãy làm rõ vấn đề qua các ví dụ nhé.

## Ví dụ về sự vi phạm nguyên tắc phân tách interface (ISP)

```typescript
interface Worker {
    work(): void;
    eat(): void;
    sleep(): void;
}

class Person implements Worker {
    eat() {
        console.log('Person can eat')
    }

    work() {
        console.log('Person can work')
    }

    sleep() {
        console.log('Person can sleep')
    }
}

class Robot implements Worker {
    eat() {
        // forced to eat => violate
        console.log('Robot cannot eat')
    }

    work() {
        console.log('Robot can work')
    }

    sleep() {
        // forced to eat => violate
        console.log('Robot cannot sleep')
    }
}
```

Ở ví dụ này ta thấy class **Person** hoàn toàn có đủ các hành vi như `work` `eat` và `sleep` nhưng điều này không hoàn toàn đúng với class **Robot**

**Robot** không `eat` mà cũng không `sleep`, việc ép buộc class **Robot** phải implement 02 method này đã *vi phạm nguyên tắc phân tách interface*.

Chúng ta cùng thiết kế lại ví dụ trên theo nguyên tắc phân tách interface nhé

## Ví dụ tuân theo nguyên tắc phân tách interface

```typescript
// Adhering

interface Eatable {
    eat(): void;
}

interface Workable {
    work(): void;
}

interface Sleepable {
    sleep(): void;
}

class Person implements Eatable, Workable, Sleepable {
    eat() {
        console.log('Person can eat')
    }

    work() {
        console.log('Person can work')
    }

    sleep() {
        console.log('Person can sleep')
    }
}

class Robot implements Workable {
    work() {
        console.log('Robot can work')
    }
}
```

Ở ví dụ này chúng ta đã phân tách các hành vi ra thành các interface riêng biệt.

Với class Person, hiển nhiên con người có thể `eat` `work` và `sleep` nên chúng ta implement toàn bộ 3 interface `Eatable` `Workable` và `Sleepable` 

Còn với class Robot, rotbot chỉ có thể `work` nên chúng ta chỉ implement interface `Workable`

Điều này giúp làm giảm lượng code rác, không cần thiết và cũng khiến cho hệ thống linh hoạt hơn, implement vừa đủ, không thừa không thiếu

## Unit test

Tiết mục unit test quen thuộc lại xuất hiện

```typescript
describe("Person", () => {
  it("able to eat", () => {
    const person = new Person()
    expect(person.eat()).not.toThrow()
  })
  it("able to work", () => {
    const person = new Person()
    expect(person.work()).not.toThrow()
  })
  it("able to sleep", () => {
    const person = new Person()
    expect(person.sleep()).not.toThrow()
  })
})

describe("Robot", () => {
  it("able to work", () => {
    const robot = new Robot()
    expect(robot.work()).not.toThrow()
  })
})
```

## Hỏi đáp

**Q: Làm thế nào để có thể ứng dụng nguyên tắc phân tách interface trong code của bạn?**

**A**: Để ứng dụng nguyên tắc phân tách interface, tôi làm theo các bước sau:

* Định nghĩa ra các interface nhỏ, tập chung vào yếu tố chuyên biệt, cụ thể của interface đó.
* Tránh tạo ra các interface lớn (gồm nhiều method) mà các class phải implements những method không cần dùng tới.
* Ưu tiên sử dụng nhiều interface chuyên biệt thay vì sử dụng một interface lớn hoặc interface mang tính chất chung chung.

## Tổng kết

Nguyên tắc phân tách interface (ISP) giúp hạn chế code rác, tập chung vào sự chuyên biệt của từng interface, nâng cao nhận thức với từng hành vi.

Điều này rất tốt cho việc tổ chức code và bảo trì cũng như khả năng kiểm thử (test)

Nếu bạn phát hiện sai sót, đừng ngần ngại báo lại cho mình qua các kênh mạng xã hội bên dưới website.

Các bài viết tiếp nối chủ đề [SOLID principles](https://anhtuank7c.dev/blog/solid-principles) sẽ sớm được cập nhật.

Chúc bạn ngày mới tốt lành.