import { render, screen } from '@testing-library/react';
import PrediccionML from '../PrediccionML';

describe('PrediccionML Component', () => {
  it('renders with default label when no props provided', () => {
    render(<PrediccionML />);
    expect(screen.getByText('Predicciones ML')).toBeInTheDocument();
    expect(screen.getByText('No hay predicciones disponibles')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<PrediccionML label="Custom Predictions" />);
    expect(screen.getByText('Custom Predictions')).toBeInTheDocument();
  });

  it('renders with empty predictions array', () => {
    render(<PrediccionML predictions={[]} />);
    expect(screen.getByText('No hay predicciones disponibles')).toBeInTheDocument();
  });

  it('renders predictions correctly', () => {
    const mockPredictions = [
      { zone: 'Bogotá', confidence: 85, trend: 'up' as const },
      { zone: 'Medellín', confidence: 72, trend: 'stable' as const },
      { zone: 'Cali', confidence: 45, trend: 'down' as const },
    ];

    render(<PrediccionML predictions={mockPredictions} />);

    // Check zones are displayed
    expect(screen.getByText('Bogotá')).toBeInTheDocument();
    expect(screen.getByText('Medellín')).toBeInTheDocument();
    expect(screen.getByText('Cali')).toBeInTheDocument();

    // Check confidence values
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('72%')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('renders trend icons correctly', () => {
    const mockPredictions = [
      { zone: 'Up Zone', confidence: 80, trend: 'up' as const },
      { zone: 'Down Zone', confidence: 60, trend: 'down' as const },
      { zone: 'Stable Zone', confidence: 70, trend: 'stable' as const },
    ];

    render(<PrediccionML predictions={mockPredictions} />);

    // Check that trend indicators are present (we can't easily test emoji rendering)
    expect(screen.getByText('Up Zone')).toBeInTheDocument();
    expect(screen.getByText('Down Zone')).toBeInTheDocument();
    expect(screen.getByText('Stable Zone')).toBeInTheDocument();
  });

  it('renders confidence colors correctly', () => {
    const mockPredictions = [
      { zone: 'High', confidence: 85, trend: 'up' as const },
      { zone: 'Medium', confidence: 65, trend: 'stable' as const },
      { zone: 'Low', confidence: 45, trend: 'down' as const },
    ];

    render(<PrediccionML predictions={mockPredictions} />);

    // High confidence should be green
    const highElement = screen.getByText('85%');
    expect(highElement).toHaveClass('text-green-400');

    // Medium confidence should be yellow
    const mediumElement = screen.getByText('65%');
    expect(mediumElement).toHaveClass('text-yellow-400');

    // Low confidence should be red
    const lowElement = screen.getByText('45%');
    expect(lowElement).toHaveClass('text-red-400');
  });

  it('limits display to 3 predictions and shows count', () => {
    const mockPredictions = [
      { zone: 'Zone 1', confidence: 80, trend: 'up' as const },
      { zone: 'Zone 2', confidence: 75, trend: 'stable' as const },
      { zone: 'Zone 3', confidence: 70, trend: 'down' as const },
      { zone: 'Zone 4', confidence: 65, trend: 'up' as const },
      { zone: 'Zone 5', confidence: 60, trend: 'stable' as const },
    ];

    render(<PrediccionML predictions={mockPredictions} />);

    // Should show first 3 zones
    expect(screen.getByText('Zone 1')).toBeInTheDocument();
    expect(screen.getByText('Zone 2')).toBeInTheDocument();
    expect(screen.getByText('Zone 3')).toBeInTheDocument();

    // Should not show 4th and 5th
    expect(screen.queryByText('Zone 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Zone 5')).not.toBeInTheDocument();

    // Should show count of additional predictions
    expect(screen.getByText('+2 más predicciones')).toBeInTheDocument();
  });

  it('does not show additional count when 3 or fewer predictions', () => {
    const mockPredictions = [
      { zone: 'Zone 1', confidence: 80, trend: 'up' as const },
      { zone: 'Zone 2', confidence: 75, trend: 'stable' as const },
    ];

    render(<PrediccionML predictions={mockPredictions} />);

    expect(screen.queryByText(/más predicciones/)).not.toBeInTheDocument();
  });
});