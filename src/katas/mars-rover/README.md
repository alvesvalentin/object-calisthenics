# Mars Rover Kata 🚀

Welcome to the **Mars Rover Kata** — a classic coding exercise to practice command parsing, movement logic, and object-oriented design. In this repo, we'll tackle this kata while applying the **Object Calisthenics** rules.

## 📚 Kata Description

A rover is on Mars. It can receive commands to move around a grid.

- The grid is a 10x10 space (coordinates from (0,0) to (9,9))
- The rover has a position (X, Y) and a direction (N, E, S, W)
- It can receive commands:
    - `M` = Move forward one grid point in the direction it is facing
    - `L` = Turn left
    - `R` = Turn right

The rover wraps around the edges of the grid.

### Example

```
Initial position: (0,0) facing N
Commands: R M M L M
Resulting position: (2,1) facing N
```

## 🎯 Goals

- Implement the rover and its command system.
- Apply **Object Calisthenics** rules to enforce clean, modular, and maintainable code.

## 🚦 Object Calisthenics Rules Reminder

1. Only One Level of Indentation Per Method
2. Don’t Use the ELSE Keyword
3. Wrap All Primitives and Strings
4. First Class Collections
5. One Dot per Line
6. Don’t Abbreviate
7. Keep All Entities Small
8. No Classes with More Than Two Instance Variables
9. No Getters/Setters/Properties

Implement the rover and commands, respecting Object Calisthenics rules.

## ✅ Example Test Cases

- Moving forward wraps at grid edges
- Turning left/right updates direction correctly
- Sequence of commands leads to expected position

