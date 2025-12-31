function getAction(role: string) {
  switch (role) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "limited access";
    case "unknown":
      return "invalid role";
    default:
      return "No action assigned";
  }
}

// Example usage:
console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));
console.log(getAction("other"));
