---
slug: solid-principles
title: SOLID principles là gì?
description: SOLID principles là một tập các nguyên tắc (principle) giúp tổ chức code theo cách dễ bảo trì, linh động và dễ dàng kiểm thử hơn.
authors: [anhtuank7c]
image: /img/solid-principles.webp
tags: [solid principles, software development principles, don't repeat yourself, dependency inversion, dependency injection]
---
![solid principles](/img/solid-principles.webp)
### SOLID principles là gì?

SOLID principles là một tập các nguyên tắc (principle) giúp tổ chức code theo cách dễ bảo trì, linh động và dễ dàng kiểm thử hơn.

**SOLID là viết tắt chữ cái đầu tiên của các nguyên tắc sau**:

* S: [Single Responsibility Principle(SRP)](https://anhtuank7c.dev/blog/single-responsibility-principle)
* O: [Open Close Principle(OCP)](https://anhtuank7c.dev/blog/open-close-principle)
* L: Liskov Substitution Principle(LSP)
* I: Interface Segregation Principle(ISP)
* D: Dependency Inversion Principle(DIP)

<!--truncate-->

> Lưu ý: một vài thuật ngữ mình sẽ không dịch ra Tiếng Việt, hoặc dịch nhưng vẫn để từ khóa Tiếng Anh bên cạnh để tránh hiểu lầm hoặc sai ý nghĩa. Mong các bạn thông cảm.

## Ưu và nhược điểm của SOLID principles?

Mặc dù SOLID sinh ra là để tổ chức code tốt hơn, tuy nhiên điều đó không có nghĩa là bạn nên tuân theo trong mọi trường hợp, đặc biệt khi team của bạn không hiểu rõ về SOLID, project nhỏ hoặc gấp gáp về thời gian. 

Hãy đảm bảo rằng bạn thảo luận kỹ với team của mình để chỉ ra được những lợi ích mà SOLID thực sự mang lại trong project mà team sắp triển khai.

### Ưu điểm

* Dễ bảo trì (Maintainability): Code tuân theo SOLID principles dễ bảo trì và dễ thay đổi hơn do được tổ chức rõ ràng và tường minh
* Linh hoạt và thích ứng (Flexibility & Adaptability): SOLID code rất linh hoạt, việc thay đổi một phần của hệ thống ít có khả năng gây ra hậu quả ngoài ý muốn ở các phần khác của hệ thống.
* Kiểm thử dễ dàng (Testability): SOLID code thực sự dễ dàng để viết test case do được tổ chức phân tách mối lo ngại (separation of concerns) và phụ thuộc nghịch đảo (dependency inversion)
* Tái sử dụng code (Code reusability): Nguyên tắc đóng mở (Open Close Principle) khuyến khích tạo ra những class dễ dàng mở rộng nhưng lại không khuyến khích sửa đổi các lớp đó. Điều này tạo điều kiện (facititate) cho việc tái sử dụng code sẵn có khi mở rộng tính năng thay vì sửa đổi code cũ.
* Dễ đọc và dễ hiểu (Readability and understandability): SOLID principles thúc đẩy (promote) thiết kế rõ ràng (clear), trực quan (intuitive). Code được tổ chức theo cách phản ánh (reflects) quan hệ giữa các thành phần (components), điều này khiến lập trình viên dễ hiểu toàn bộ cấu trúc cũng như hành vi tổng thể của hệ thống.
* Giảm thiểu code trùng lặp (Reduce code duplication): Bằng cách tuân theo DRY principle (Don't Repeat Yourself), SOLID principles giúp giảm thiểu code trùng lặp, các function có thể được đóng gói trong các thành phần có thể chia sẻ (sharable components) , tái sử dụng và tránh dư thừa (redundancy) code.
* Phân tách mối lo ngại (Separation of concerns): SOLID principles phân tách rõ ràng các mối lo ngại (separation of concerns), đảm bảo rằng mỗi thành phần (components) có trách nhiệm riêng cụ thể (specific responsibility). Sự phân tách này giúp dễ dàng suy luận về các thành phần của hệ thống, đơn giản hóa (simplifies) việc gỡ lỗi (debugging) và bảo trì (maintenance)
* Dễ dàng hợp tác (Easier to collaboration): Một cấu trúc code được tổ chức tốt, tuân theo SOLID principles giúp các lập trình viên dễ dàng hợp tác, phối hợp với nhau. Thiết kế mô đun cho phép các nhóm hoặc các lập trình viên có thể làm việc trên những phần của hệ thống với sự can thiệp tối thiểu, không bị block chéo.
* Phụ thuộc nghịch đảo (Dependency inversions): Nguyên tắc phụ thuộc nghịch đảo (Dependency Inversion Principle) khuyến khích sử dụng các lớp trừu tượng và phụ thuộc trực tiếp (dependency injection) vốn giúp giảm thiểu sự liên kết giữa các thành phần (loosely coupled components). Điều này khiến cho việc thay thế (substitution), nâng cấp (upgrade) các gói phụ thuộc trở nên dễ dàng hơn mà không làm ảnh hưởng tới toàn bộ hệ thống.

Bên cạnh hàng loạt những ưu điểm thì SOLID principles cũng bộc lộ những nhược điểm nhất định.  Không có nguyên tắc thiết kế nào hoàn hảo cho mọi hoàn cảnh, mọi project. Chính vì vậy mình luôn khuyên các bạn nên thận trọng và cân nhắc kỹ trước khi áp dụng.

### Nhược điểm

* Phức tạp hóa vấn đề thái quá (Over-engineering): Ứng dụng toàn bộ SOLID principles một cách nghiêm ngặt (rigorously) trong mọi trường hợp có thể dẫn tới việc phức tạp hóa vấn đề một cách thái quá trong những dự án đơn giản, những dự án nhỏ. Không phải dự án nào cũng nhận được lợi ích từ tất cả các nguyên tắc (principle), bạn cần phải cân bằng những nguyên tắc đó dựa trên quy mô và độ phức tạp của dự án.
* Tốn thời gian học tập (Learning curve): Với những lập trình viên chưa từng ứng dụng SOLID principles, họ cần phải bỏ thời gian ra để học thêm, điều này khiến cho chi phí thời gian tăng cao trong khi dự án cần phải đẩy tiến độ nhanh, đồng thời sẽ gặp khó trong việc ứng dụng SOLID principle triệt để và đúng cách, thậm chí nếu họ hiểu không sâu còn có thể ứng dụng sai cách.
* Gia tăng số lượng class và abstraction (Increase number of class and abstraction): Tuân theo SOLID principles thường dẫn tới việc tăng đáng kể số lượng các class, abstraction class/interface. Mặc dù SOLID giúp codebase trở nên dễ bảo trì hơn, nhưng lại gia tăng sự phức tạp với các dự án nhỏ.
* Tiềm tàng abstraction quá mức (Potential for abstraction overhead): Đưa ra quá nhiều lớp trừu tượng (abstraction class/interface) để tuân theo SOLID principle có thể gia tăng sự phức tạp. Nó có thể khiến code trở nên khó hiểu hơn, đặc biệt là với những lập trình viên không quen với những lớp trừu tượng (abstract class/interface) được sử dụng.
* Tốn thời gian khởi tạo hơn (Increase initial development time): Tuân theo SOLID principles một cách nghiêm ngặt có thể cần nhiều thời gian hơn trong quá trình khởi tạo dự án. Lập trình viên cần thiết kế những lớp trừu tượng (abstract class/interface) một cách cẩn thận, và cơ chế phụ thuộc trực tiếp. Điều này làm giảm đáng kể tốc độ phát triển dự án tại pha khởi tạo (initial phase).
* Quá lệ thuộc vào các gói phụ thuộc trực tiếp (Dependency Injection overhead): Việc sử dụng các gói phụ thuộc trực tiếp được khuyến khích theo nguyên tắc SOLID, tuy nhiên đôi khi việc dùng quá nhiều gói phụ thuộc trực tiếp lại làm cho lập trình viên khó cấu hình cũng như hiểu flow của các gói này. Trong vài trường hợp, một dự án đơn giản không hề nhận lại được lợi ích khi sử dụng kiểu phụ thuộc này.
* Thách thức trong việc ứng dụng vào dự án cũ (Challenging in legacy codebase): Ứng dụng SOLID principle vào dự án cũ là một thách thức lớn. Code cũ có thể không tuân theo SOLID một chút nào, và việc tái cấu trúc (refactoring) và tuân theo (adhere) tốn nhiều thời gian cũng như gây ra các lỗi tiềm tàng.
* Gia tăng thời gian nhận thức (Increase cognitive load): Với những lập trình viên có ít kinh nghiệm hoặc không có kinh nghiệm với SOLID principles thì họ cần thêm thời gian để hiểu các quy tắc (rules) và các hướng dẫn (guidelines). Điều này có thể dẫn tới việc hiểu sai (misunderstanding) hoặc vi phạm (violates) các nguyên tắc một cách vô ý (unintentional).

## Tổng kết

Việc ứng dụng SOLID principles cần được thảo luận và cân nhắc kỹ càng về nguồn lực, sự hiểu biết cũng như quy mô và sự phức tạp của dự án.

Nếu team của bạn triển khai dự án nhỏ, đơn giản và cần ít người thực hiện thì câu trả lời là bạn không nên áp dụng hoặc áp dụng một cách cơ bản, không quá nghiêm ngặt.

Nếu bạn muốn triển khai SOLID, hãy đảm bảo rằng team của bạn triển khai đào tạo nội bộ và ứng dụng SOLID trong các dự án bên lề (side project) trước khi triển khai cho khách hàng. Điều này sẽ cứu bạn một bàn thua trông thấy.

Chi tiết về 5 nguyên tắc SOLID sẽ được mình trình bày trong các bài viết tiếp theo do bài này đã quá dài rồi.

Cảm ơn bạn đã quan tâm, theo dõi.

Nếu bạn cảm thấy bài này giúp ích cho bạn, hãy chia sẻ, lan tỏa tới mọi người giúp mình nhé.

Trân trọng,