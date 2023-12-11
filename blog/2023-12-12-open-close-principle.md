---
slug: open-close-principle
title: Open Close Principle (OCP)
image: /img/open-close-principle.webp
authors: [anhtuank7c]
tags: [Open Close Principle, solid principles, software development principle]
---

![Open Close Principle](/img/open-close-principle.webp)

Tiếp nối chuỗi bài viết [SOLID principles](https://anhtuank7c.dev/blog/solid-principles), hôm nay chúng ta sẽ tìm hiểu về Nguyên tắc đóng mở (Open Close Principle)

### Định nghĩa

Nguyên tắc đóng mở (Open Close Principle) khuyến khích việc thiết kế các thực thể (entities) như class, module... theo hướng mở cửa cho việc mở rộng (open for extension)  và đóng cửa với việc sửa đổi (close for modification)

<!--truncate-->

## Ví dụ

### Ví dụ vi phạm OCP

```typescript
// Violating OCP

class Shape {
    constructor(protected width: number, protected height: number) {}

    getArea(): number {
        return this.width * this.height
    }
}

class Square extends Shape {
	constructor(private side: number) {
		super(side, side);
	}
}

class Rectangle extends Shape {
	constructor(private width: number, private height: number) {
		super(width, height);
	}
}

class Circle extends Shape {
    constructor(private radius: number) {
        super(radius, radius)
    }
}
```

Ở ví dụ này, class `Shape` vẫn ổn cho tới khi mở rộng tới class `Circle`. Cách tính diện tích của hình tròn hoàn toàn khác biệt với hình vuông và hình chữ nhật. Khi này bạn cần sửa đổi method `getArea` ở class `Shape` để có thể chứa được trường hợp lớp mở rộng là hình tròn (Circle)

Việc sửa đổi này hoàn toàn đi ngược lại với nguyên tắc đóng mở vì cần phải sửa đổi class `Shape`.

### Ví dụ tuân theo OCP

Chúng ta hãy thiết kế lại các class này để giúp nó dễ dàng mở rộng mà lại không cần sửa đổi nhé.

```typescript
// Adhering OCP

interface Shape {
	getArea(): number;
}

class Square implements Shape {
	constructor(private side: number) {}

	getArea(): number {
		return this.side * 2
	}
}

class Rectangle implements Shape {
	constructor(private width: number, private height: number) {}

	getArea(): number {
		return this.width * this.height;
	}
}

const square = new Square(20);
const rect = new Rectangle(20, 40);

console.log('area of square', square.getArea())
console.log('area of rectangle', rect.getArea())
```

Ở lần sửa đổi này mình dùng interface (các bạn cũng có thể dùng abstract class, miễn sao các class kế thừa từ abstract class có thể tự triển khai business logic mà không cần sửa đổi ở lớp abstract).

Bạn có thể mở rộng ra các class mới như Hexagon (hình lục giác) hay nhiều hình dạng khác (Circle, Square, Rectangle, Hexagon, Triangle, Star, etc...) mà vẫn tuân theo Open Close Principle, không cần sửa đổi gì ở interface Shape.

```typescript
// Adhering OCP

abstract class Shape {
    abstract getArea(): number
}

class Square extends Shape {
    constructor(private width: number, private height: number) {
        super()
    }

    getArea(): number {
        return this.width * this.height
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super()
    }

    getArea(): number {
        return Math.PI * Math.pow(this.radius, 2)
    }
}

class Hexagon extends Shape {
    constructor(private side: number) {
        super()
    }

    getArea(): number {
        return ((3 * Math.sqrt(3) * (this.side * this.side)) / 2);  
    }
}
```

Ở ví dụ này mình dùng abstract class và mở rộng ra tận class Hexagon, kết quả tương tự ví dụ trên. Tất cả class đều tuân theo nguyên tắc Mở cho việc mở rộng, và đóng với việc sửa đổi.

Các bạn có nhận ra các class này có điều gì quen quen không nhỉ?

Bật mí nhé, đó là mỗi class đều đảm nhiệm một và chỉ một nhiệm vụ riêng. VD class Square thì chỉ tính diện tích cho Square, class Rectangle chỉ tính diện tích cho Rectangle. 

Bạn hãy nhớ tới bài viết trước [Single Responsibility Principle (SRP)](https://anhtuank7c.dev/blog/single-responsibility-principle) xem có đúng nó không nào?

Việc áp dụng thành thục các tập nguyên tắc SOLID (principles) sẽ giúp bạn rất nhiều đó, cố gắng luyện tập thành thói quen tốt nhé.

## Unit test

Đây là phần không thể thiếu và luôn được nhấn mạnh (emphasize) khi tuân theo SOLID principle.

```typescript
it('calculate square area correctly', () => {
	const square = new Square(4)
	expect(square.getArea()).toEqual(16)
})

it('calculate rectangle area correctly', () => {
	const rect = new Rectangle(4, 8)
	expect(rect.getArea()).toEqual(32)
})
```

> Unit test mình luôn sử dụng Jest nhé. Các bạn muốn tìm hiểu thêm về jest thì mình sẽ viết riêng một hoặc vài bài về jest.

## Kết luận

Nguyên tắc đóng mở (Open Close Principle) mang lại rất nhiều lợi ích khi bạn mở rộng mà không phá vỡ hệ thống. Đảm bảo hệ thống hoạt động ổn định đồng thời dễ bảo trì, dễ kiểm thử (unit test), dễ đọc và dễ nắm bắt.

Nếu bạn phát hiện sai sót, đừng ngần ngại báo lại cho mình qua các kênh mạng xã hội bên dưới website.

Các bài viết tiếp nối chủ đề SOLID principles sẽ sớm được cập nhật.

Chúc bạn ngày mới tốt lành.
