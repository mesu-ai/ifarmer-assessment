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

export interface CategoryProps {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: CategoryProps;
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
  categories: CategoryProps[];
  onSubmit: (data: CreateProductProps) => Promise<void>;
  isSubmitting: boolean;
}

export interface InputImageProps {
  label: string;
  images: string[];
  onImageChange: (index: number, value: string) => void;
  onImageRemove: (index: number) => void;
  onImageAdd: (url: string) => void;
  imageInput: string;
  onImageInputChange: (value: string) => void;
  error?: string;
  maxImages?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface OptionProps {
  value: string | number;
  label: string;
}

export interface InputSelectProps {
  name: string;
  label: string;
  value: string | number;
  options: OptionProps[];
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export interface InputTextareaProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  rows?: number;
  maxLength?: number;
  charCount?: string;
}

export interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  autoClose?: boolean;
  autoCloseDelay?: number;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}