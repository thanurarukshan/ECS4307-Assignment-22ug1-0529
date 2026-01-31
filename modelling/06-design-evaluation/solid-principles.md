# SOLID Principles Evaluation - LearnHub LMS

**Author:** T.R.S. Wickramarathna  
**Registration Number:** 22ug1-0529  
**Module:** Software Modelling and Analysis

## 1. Single Responsibility Principle (SRP)

**Principle:** A class should have only one reason to change.

### Adherence

✅ **Good Examples:**
- `authController.ts`: Handles only authentication-related operations
- `courseController.ts`: Manages only course CRUD operations
- `User.ts` model: Represents user data structure only
- `authMiddleware.ts`: Solely responsible for JWT validation

✅ **Code Example:**
```typescript
// authController.ts - Single responsibility: authentication
export const login = async (req: Request, res: Response) => {
  // Only handles login logic
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  // ...JWT generation
};

export const register = async (req: Request, res: Response) => {
  // Only handles registration logic
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  // ...user creation
};
```

### Violations

⚠️ **Areas for Improvement:**
- `enrollmentController.ts` handles enrollment AND progress tracking (could be split)
- Frontend pages sometimes mix data fetching with UI rendering
