export interface GameState {
  players: {
    player1: string;
    player2: string;
  };
  board: (string | null)[];
  xIsNext: boolean;
  round: number;
  scores: {
    player1: number;
    player2: number;
  };
  roundWins: {
    player1: number;
    player2: number;
  };
  gameOver: boolean;
  finalWinner: string;
  message: string;
  leaderboard: Array<{
    timestamp: string;
    players: {
      player1: string;
      player2: string;
    };
    winner: string;
    scores: {
      player1: number;
      player2: number;
    };
    roundWins: {
      player1: number;
      player2: number;
    };
  }>;
}

export interface GameData {
  players: {
    player1: string;
    player2: string;
  };
  scores: {
    player1: number;
    player2: number;
  };
  roundWins: {
    player1: number;
    player2: number;
  };
  finalWinner: string;
  gameOver: boolean;
}

export interface PlayerStats {
  name: string;
  totalScore: number;
  gamesPlayed: number;
  wins: number;
  roundWins: number;
}


export interface GameOverScreenProps {
  finalWinner: string;
  players: {
    player1: string;
    player2: string;
  };
  roundWins: {
    player1: number;
    player2: number;
  };
  goToResults: () => void;
}

export interface GameHeaderProps {
  round: number;
  players: {
    player1: string;
    player2: string;
  };
  roundWins: {
    player1: number;
    player2: number;
  };
  xIsNext: boolean;
}

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  name?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface LinkButtonProps {
  name: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export interface PlayerStatisticsProps {
  name: string;
  totalScore: number;
  wins: number;
  gamesPlayed: number;
  roundWins: number;
}
export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt?: string;
  updatedAt?: string;
}

export interface CreateProductProps {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductFormData {
  title: string;
  price: string;
  description: string;
  categoryId: string;
  images: string[];
}

export interface FormErrors {
  title?: string;
  price?: string;
  description?: string;
  categoryId?: string;
  images?: string;
}

export interface ProductFormProps {
  initialData?: {
    id?: number;
    title: string;
    price: number;
    description: string;
    category: { id: number; name: string };
    images: string[];
  };
  categories: Category[];
  onSubmit: (data: CreateProductProps) => Promise<void>;
  isSubmitting: boolean;
}