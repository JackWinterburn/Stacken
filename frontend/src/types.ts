type Card = {
    CreatedAt: string;
    Cards: Card[];
    DeletedAt: string | null;
    ID: number;
    Question: string;
    Answer: string;
    UpdatedAt: string;
    DeckID: number;
};

type Deck = {
    CreatedAt?: string;
    Cards: Card[];
    DeletedAt?: string | null;
    ID: number;
    Title: string;
    UpdatedAt: string;
    SectionID: number;
};

export type Section = {
    CreatedAt?: string;
    Decks: Deck[];
    DeletedAt?: string | null;
    ID: string | undefined;
    Title: string;
    UpdatedAt?: string;
    UserID: number;
};

type User = {
    CreatedAt: string;
    DeletedAt: string | null;
    UpdatedAt: string;

    Name: string;
    Email: string;
    Password: string;

    Sections: Section[];
};
