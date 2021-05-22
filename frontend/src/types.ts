export type UserCreatedValue = {
    CreatedAt:         string;
    DeletedAt:         string;
    Email:             string;
    ID:                number;
    Name:              string;
    Password:          string;
    ProfilePictureURL: string;
    Sections:          null | [];
    UpdatedAt:         string;
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

/*--------------------- SECTIONS ---------------------*/

export type Section = {
    ID:        number;
    // TODO: Create a dedicated date type
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Title:     string;
    UserID:    number;
    Decks:     Deck[] | null;
}

export type Deck = {
    ID:        number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    Title:     string
    SectionID: number;
    Cards:     Card[] | null;

}

export type Card = {
    Back:      string;
    CreatedAt: string;
    DeckID:    number;
    DeletedAt: string | null;
    Front:     string;
    ID:        number;
    UpdatedAt: string;
}