export type UserCreatedValue = {
    CreatedAt: string;
    DeletedAt: string;
    Email:     string;
    ID:        number;
    Name:      string;
    Password:  string;
    Sections:  null | [];
    UpdatedAt: string;
}

// Used in "/api/register.ts"
export type RegistrationUserInfo = {
    name:    string;
    // TODO: create a unique type for email
    email:    string;
    // TODO: create a unique type for password
    password: string;
}

// Used in "/api/login.ts"
export type LoginUserInfo = {
    email:    string;
    password: string;
}


export type RegistrationErrorMessage = {
    Code:             string;
    Column:           string;
    Constraint:       string;
    DataTypeName:     string;
    Detail:           string;
    File:             string;
    Hint:             string;
    InternalPosition: string;
    InternalQuery:    string;
    Line:             string;
    Message:          string;
    Position:         string;
    Routine:          string;
    Schema:           "public" | "private";
    Severity:         string;
    Table:            "users";
    Where:            string;
}

export type RegistrationSuccessMessage = {
    Error:        null;
    RowsAffected: 1;
    Severity:     string;
    Value:        UserCreatedValue;
}