# functionish
A functional-ish programming library for Node

### What is functionish programming?

Functionish programming is a programming paradigm inspired by the core concepts of functional programming, but not
quite. Functionish programming is best summed up by the following quote:

> <em>&ldquo;Best practices without orthodoxy and more functions than you can shake a stick at&rdquo;</em>

Functionish programming seeks to combine a set of best programming practices with a subset of functional programming's
core concepts. Why just a subset? Partly because a subset is all that we need to write high-quality, effortlessly
readable and well maintainable code, and mostly because so much of functional programming is incomprehensible for 
those of us without a PhD in lambda calculus.

To get a proper feel for what functionish programming is, we should first take a look at the functionish programmer's
primary tool: Javascript. Which begs the questions: why Javascript?

### Why Javascript?

Javascript is remarkably well-suited for functionish programming. In fact, with Javascript you get functionish
programming right out of the box - no configuration required. Originally intended by its author Brendan Eich a 
Scheme-*ish* language when he first sat down to design it, the language he produced 10 days later on the surface looks
a lot more Java-*ish*. 

*Ish*iness lies at the core of Javascript's design. More often than not ostensibly boolean values in Javascript are
in fact bool*ish*. And under the hood that other fundamental type of any programming language (the Array) in
Javascript is only Array-*like* - which of course is just fancy speak for Array-*ish*. Heck, even Javascript's standard
for value equality is met by just a vague resemblance; that's some unabashed *ish*iness right there, that is. Not to
mention Javascript classes (mostly because us functionish programmers indeed prefer not to mention classes unless we
really, really have to). Add higher-order functions and closures to the mix and what you're left with is the perfect
language for functionish programming.

That's why Javascript.

### What about Typescript?

No, no, no, no, no. No types and no Typescript. Not that there's anything wrong per sé with type safety, nor that
functionish programming is inherently incompatible with types. Not at all. It's just that type safety goes against the
grain of what Javascript and functionish programming is all about.

If you're a Typescript apologist, chances are you're a closet Java-lover. Not that there's anything wrong per sé with
loving Java. Many functionish programmers count one or two Java-lovers among their own friends. Maybe not their best
friends, but still. Any many of us even have a personal history with Java. We've been through that phase and we
understand the appeal of the Typescript.

There are no bugs that a type-safe compiler can catch at compile time that can't be protected against just a effectively
by well-designed functionish code (characterized by a plethora of relatively small and mostly pure functions and
predominantly immutable state) combined with a disciplined testing regime. For all the extra effort and code complexity
that Typescript brings to the table, the cost of Typescript outweighs the benefit many times over.

So if you're a Typescript devotee and you find the thought of reverting to vanilla Javascript disconcerting, feel free
to try functionish programming with types if you so wish. But I invite you to lighten up and extract that stick
from your ass, even if just for a short while, and take vanilla Javascript for a spin - functionish style. See
if maybe, just maybe, functionish programming with vanilla Javascript can work for you.

### Is functionish programming difficult?

Yes and no. The functional programming constructs that functionish programming co-opts can be a bit daunting to wrap
your head around. The basics are not that difficult. In fact, just because we don't understand functors and monoids and
and combinators and so on doesn't we mean we don't use them. We use them all the time. We just don't know that we're
using them, primarily because we just call them things like `map()` and `flatten()` and `id()` and so on. So in that
sense, functionish programming is pretty doable. 

However, to truly reap the benefits of those constructs does require thought and effort. Simply knowing what function
composition means, doesn't mean you fully grasp the power that it can provide. And at first sight currying seems like
an ugly duckling, awkward and hardly worth your while, until one day you see the light and you understand how
judicious currying can lift your code to an abstraction level that at once renders your code so much more reliable and
so much more natural. But again, there's a learning curve that you have to go through to get there. So in that sense,
functionish programming does require some effort, at least until you reach the point where it just comes naturally.

### So what exactly is functionish programming?

1. Be pure, but not a purist
2. Immutable, but not inflexible
3. Closures not classes
4. The three C's of functionish programming: Curry, Compose and map-reduCe
5. Size does make a difference
6. A good one-liner really says it all
7. Everything is in a name
8. Ternary: yes or no?
9. It's easier to be a simpleton than a smart-ass
10. This gets our panties in a twist
11. The maintainer always comes first
12. Imperative is not a dirty word

### What about performance?

Yawn. What about it? No doubt, functionish programming's reliance on abundant functions, composition, purity and
state immutability results in code that is less performant than imperative code (and perhaps even an object oriented
code design). But I've underperformed pretty much all my life, and other than an acute inferiority complex, I'm none
the worse off for it.

It's not a question of which programming paradigm is more performant, the question is whether it really makes a
difference.