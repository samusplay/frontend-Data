import { render, screen } from '@testing-library/react';
import Score from '../Score';

describe('Score Component', () => {
  it('renders with default label when no props provided', () => {
    render(<Score />);
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<Score label="Custom Score" />);
    expect(screen.getByText('Custom Score')).toBeInTheDocument();
  });

  it('renders with null score', () => {
    render(<Score score={null} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders with undefined score', () => {
    render(<Score score={undefined} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('renders high score (green) correctly', () => {
    render(<Score score={85} />);
    const scoreElement = screen.getByText('85%');
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement).toHaveClass('text-green-400');
    expect(screen.getByText('Excelente rendimiento')).toBeInTheDocument();
  });

  it('renders medium score (yellow) correctly', () => {
    render(<Score score={75} />);
    const scoreElement = screen.getByText('75%');
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement).toHaveClass('text-yellow-400');
    expect(screen.getByText('Buen rendimiento')).toBeInTheDocument();
  });

  it('renders low score (red) correctly', () => {
    render(<Score score={45} />);
    const scoreElement = screen.getByText('45%');
    expect(scoreElement).toBeInTheDocument();
    expect(scoreElement).toHaveClass('text-red-400');
    expect(screen.getByText('Requiere atención')).toBeInTheDocument();
  });

  it('renders score at boundary values correctly', () => {
    // Test 80 (should be green)
    const { rerender } = render(<Score score={80} />);
    expect(screen.getByText('80%')).toHaveClass('text-green-400');

    // Test 79 (should be yellow)
    rerender(<Score score={79} />);
    expect(screen.getByText('79%')).toHaveClass('text-yellow-400');

    // Test 60 (should be yellow)
    rerender(<Score score={60} />);
    expect(screen.getByText('60%')).toHaveClass('text-yellow-400');

    // Test 59 (should be red)
    rerender(<Score score={59} />);
    expect(screen.getByText('59%')).toHaveClass('text-red-400');
  });
});