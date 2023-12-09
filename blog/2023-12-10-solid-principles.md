---
slug: solid-principles
title: SOLID principles
authors: [anhtuank7c]
tags: [solid principles, software development principles, don't repeat yourself, dependency inversion, dependency injection]
---
> In this post, I will introduce SOLID principles, pros and cons.

### What is SOLID principles?

> SOLID principles are set of principles that help to write maintainable, flexible and testable program.

<!--truncate-->

SOLID stand for:

* S: Single Responsibility Principle (SRP)
* O: Open Close Principle (OCP)
* L: Liskov Substitution Principle (LSP)
* I: Interface Segregation Principle (ISP)
* D: Dependency Inversion Principle (DIP)

### Pros and cons of SOLID principles?

There are some pros and cons while apply SOLID into your code, you might want to research, discuss carefully with your team to find the right match.

> SOLID principles is just a theory, a set of rules. There are no right or wrong, just match your need or not. One more time, ensure you and your teammate have good understanding and found the true benefit of applying SOLID principles. Don't listen to anyone who says it good or bad.

**Pros**:

* Maintainability: Code adheres to SOLID principles is easier to maintain, and modify over time as it structured in a clear and organized way.
* Flexibility & Adaptability: SOLID code is also more flexible, as change to one part of the system are less likely to have unintended consequences in other parts of codebase.
* Testability: SOLID code is easier to test, as it designed with principles of separation of concerns and dependency inversion in mind (The higher layer depend of lower level abstraction).
* Code reusability: The Open Close Principle encourage the creation of classes that are open for extension but close for modification. This facilitate the reuse of existing code when extending functionality rather than modifying existing code.
* Readability and understandability: SOLID principles promote a clear and intuitive design. Code is organized in a way that reflects the relationships between components, making it easier for developers to understand the overall structure and behavior of the system.
* Reduce code duplication: By adhering to the DRY (Don't Repeat Yourself) principle, SOLID principles help in reducing code duplication. Share functionality can be encapsulated in resusable components, avoiding redundancy.
* Separation of concerns: SOLID principles enforce a clear separation of concerns, ensuring thart each component has a specifict responsibility. This separation makes it easier to reason about individual parts of the system and simplifies debugging and maintenance.
* Easier to collaboration: A well organized codebase following SOLID principles is generally easier for multple developers to collaborate on. The modular design allows different teams or developers to work on different parts of the system with minimal interference.
* Dependency inversions: The Dependency Inversion Principle encourages the use of abstractions and dependency injection, which can lead to more loosely coupled components. This makes it easier to replace or upgrade dependencies without affecting the entire system.

**Cons**:

* Over-engineering: Applying all SOLID principles rigorously in every scenario might lead to over-engineering in simpler projects. Not every project may benefit equally from all principles and its essential to strike a balance based on the project's size and complexity.
* Learning curve: For developers new to SOLID principles, there might be a learning curve. It may take some time to understand the principles thoroughly and apply them correctly.
* Increase number of class and abstraction: Following SOLID principles often leads to a larger number of classes and interfaces, which can increase code verbosity. While this can improve maintainability, it might also make the codebase more complex for simpler projects.
* Potential for abstraction overhead: Introducing too many abstraction to adhere to SOLID principles can result in additional complexcity. It might make the code harder to understand, especially for those not familiar with the specific abstract used.
* Increase initial development time: Adhering strictly to SOLID principles may require more time during the initial development phase. Developers may need to carefully design interfaces, abstract classes and dependency injection mechanism which can slow down the development process.
* Dependency Injection overhead: Dependency Injection which is encouraged by SOLID, may introduce some overhead, especially in terms of configuration and understanding the flow of dependencies. In some cases, simpler project may not see significant benefits from full-fledged dependency injection.
* Challenging in legacy codebase: Applying SOLID principles in legacy codebases can be challenging. Existing code may not align well with SOLID principles, and refactoring to adhere to them might be time-comsuming and error-prone.
* Increase cognitive load: For less experienced developers or those not familiar with SOLID principles, the increased number of rules and guidelines can contribute to a higher cognitive load. This might lead to misunderstandings or unintentional violations of the principles.
