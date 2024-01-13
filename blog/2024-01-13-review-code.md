---
title: Review code
slug: review-code
description: Review code là gì? Vì sao cần review code? Các vấn đề chính khi review code.
authors: [anhtuank7c]
tags: [review code, software development, code quality, quality control]
image: /img/review-code.webp
---

![Review code](/img/review-code.webp)

## Review code là gì?

Review code là một hoạt động quan trọng trong quá trình phát triển phần mềm, nơi các đồng nghiệp kiểm tra và đánh giá chéo mã code của nhau.

## Vì sao cần review code?

Việc con người gây ra lỗi là điều không mong muốn nhưng cũng không hoàn toàn tránh được (Có nhiều yếu tố khiến con người gây ra lỗi như thể trạng sức khỏe, tâm lý, tiếng ồn, suy giảm sự tập chung, etc...). Vì vậy chúng ta cần review code để giảm thiểu rủi ro tiềm tàng cho hệ thống càng sớm càng tốt.

Mục tiêu chính của việc review code bao gồm:

* Tìm và sửa lỗi
* Đảm bảo code tuân thủ các tiêu chuẩn, các nguyên tắc mà dự án đang áp dụng
* Cung cấp cơ hội chia sẻ kiến thức giữa các thành viên
* Gia tăng giao tiếp giúp các thành viên hiểu nhau hơn

## Các vấn đề chính khi review code

Bạn cần tạo ra một danh sách (checklist) những câu hỏi và quy tắc được xác định trước mà dự án (và nhóm của bạn) sẽ tuân theo trong quá trình review.

Danh sách này thường tập chung vào các vấn đề chính sau:

* **Readability** (Khả năng đọc): Có bất kỳ đoạn comment dư thừa nào trong code không?
* **Security** (Bảo mật): Đoạn mã có khả năng khiến hệ thống bị tấn công mạng không?
* **Test coverage** (Độ bao phủ test): Có cần thêm các test case khác không?
* **Architecture** (Kiến trúc): Mã có tính bao đóng, mô đun hóa để đạt được sự phân tách mối quan ngại không (separation of concerns)? Pattern áp dụng có chính xác không?
* **Reusability** (Khả năng tái sử dụng): Mã có tái sử dụng các components, functions hay services có sẵn không?

Bằng cách kiểm tra danh sách câu hỏi những vấn đề trong đoạn code sẽ được phơi bày một cách chi tiết và tường minh, không mang cảm tính. Việc sửa lỗi cũng trở nên rõ ràng và dễ hiểu hơn.

## Những lưu ý khi review code

### Để lại review chi tiết

Khi bạn review code, đừng chỉ để lại những đánh giá chung chung hoặc chỉ gợi ý thay đổi, thay vào đó hãy giải thích vấn đề hiện tại là gì, vì sao nên thực hiện thay đổi.

Vì sao cần giải thích chi tiết như vậy?

* Đó là cách mà bạn biện minh cho nhận xét của mình, họ sẽ k cần hỏi lại bạn vì sao nên thực hiện những thay đổi mà bạn khuyến nghị. Điều này sẽ tiết kiệm thời gian cho bạn và cho người đánh giá.
* Bạn review code cẩn thận hơn, không xuề xòa cho qua, nói có sách, mách có chứng.
* Người được đánh giá code sẽ biết lý do cụ thể vì sao họ cần thực hiện thay đổi, điều này giúp họ giải quyết vấn đề tương tự trong tương lai.

### Giữ thái độ đúng mực, cầu tiến

Việc review code suy cho cùng là khiến cho con tàu đi đúng hướng, mục tiêu dự án hoàn thành một cách đúng đắn. Mọi người cần giữ thái độ đúng mực, cầu tiến khi review cũng như khi nhận được review. Hãy loại bỏ yếu tố cảm xúc để tránh ảnh hưởng tới công việc.

Nếu bạn viết code chưa được tốt, những feedback đáng giá sẽ giúp bạn viết code tốt hơn, điều này tốt cho bạn.

### Không review đoạn code dài hơn 200 dòng

[Nghiên cứu tại Cisco Systems năm 2006](https://static1.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf) chỉ ra rằng khả năng tìm ra bug của developer giảm dần khi phải review nhiều hơn 200 dòng code.

### Mỗi commit chỉ nên chứa một ý nghĩa

Những commit chứa quá nhiều code, nhiều thay đổi không liên quan tới nhau cũng làm giảm khả năng khôi phục mã code trong các nhánh (branch) đồng thời cũng làm khó người review.

Ví dụ: bạn có một commit đảm nhiệm 02 thay đổi: format code, add thêm business logic

Khi này bạn cần tách ra làm 02 commit riêng lẻ, 01 commit cho format code, 01 commit cho việc add thêm business logic.

### Tự động hóa quá trình review code

Trên thị trường có nhiều công cụ review code tự động có thể kể đến SonarQube, ESLint, SwiftLint, JSHint, Codestriker, Deepscan etc...

Tùy thuộc dự án và chi phí mà bạn tìm công cụ phù hợp với mình.

Đa phần các công cụ này đều rất dễ dàng tích hợp vào CI/CD, developer có thể nhận được phản hồi rất sớm sau khi commit code (hoặc trước khi commit code như sử dụng precommit kết hợp Linter).

Việc này cũng làm giảm tải đáng kể cho người review.

Tuy nhiên những công cụ này không hoàn toàn thay thế cho con người được, có thể kể đến những nguyên tắc mà team bạn đề ra, lấy ví dụ như SOLID principles, bạn cần yếu tố con người để review khía cạnh này một cách chuẩn xác hơn.

### Developer cần hiểu rõ trách nhiệm

Dù review code giúp nâng cao chất lượng code và giảm thiểu lỗi, tuy nhiên không ai chắc chắn 100% phương pháp này sẽ loại bỏ hoàn toàn những lỗi tiềm tàng.

Bạn với tư cách là người viết code cần chịu trách nhiệm cao nhất về tính đúng đắn của code.

## Kết bài

Code review là một hoạt động thú vị nhưng mất thời gian và công sức. Tuy nhiên kết quả có tốt hay không còn phụ thuộc vào sự cam kết của team bạn.

Team bạn áp dụng quy trình review code như thế nào?

Nếu bạn thấy bài viết này còn thiếu sót hay cần bổ sung gì thì đừng ngần ngại liên hệ với mình qua các kênh mxh bên dưới nhé.

Chúc bạn và team có những buổi review code hiệu quả.