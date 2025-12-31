"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAction(role) {
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
console.log(getAction("admin")); // Output: Manage users and settings
console.log(getAction("editor")); // Output: Edit content
console.log(getAction("viewer")); // Output: View content
console.log(getAction("guest")); // Output: limited access
console.log(getAction("unknown")); // Output: invalid role
console.log(getAction("other")); // Output: No action assigned
//# sourceMappingURL=index.js.map