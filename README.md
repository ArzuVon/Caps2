# Caps2

>The core functionality we’ve already built remains the same. The difference in this phase is that we’ll be creating a networking layer. As such, the user stories that speak to application functionality remain unchanged, but our developer story changes to reflect the work needed for refactoring.

- As a vendor, I want to alert the system when I have a package to be picked up.
- As a driver, I want to be notified when there is a package to be delivered.
- As a driver, I want to alert the system when I have picked up a package and it is in transit.
- As a driver, I want to alert the system when a package has been delivered.
- As a vendor, I want to be notified when my package has been delivered.
- And as developers, here is our updated story relevant to the above.

- As a developer, I want to create network event driven system using Socket.io so that I can write code that responds to events originating from both servers and client applications

>TECH In order to switch from Node Events to Socket.io, the refactoring process will involve changes to each application to use the core features of `Socket.io`.

### The goal of this lab is to create a namespaced Socket.io event server, and to configure Vendor and Driver Client Modules.

## PR for Lab 12

- [PR for lab 12]()

## Caps UML

![Caps UML]()

## Collaborators

- Sarah