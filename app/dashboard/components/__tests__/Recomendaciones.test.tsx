import { render, screen } from '@testing-library/react';
import Recomendaciones from '../Recomendaciones';

describe('Recomendaciones Component', () => {
  it('renders with default label when no props provided', () => {
    render(<Recomendaciones />);
    expect(screen.getByText('Recomendaciones')).toBeInTheDocument();
    expect(screen.getByText('No hay recomendaciones disponibles')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<Recomendaciones label="Custom Recommendations" />);
    expect(screen.getByText('Custom Recommendations')).toBeInTheDocument();
  });

  it('renders with empty recommendations array', () => {
    render(<Recomendaciones recommendations={[]} />);
    expect(screen.getByText('No hay recomendaciones disponibles')).toBeInTheDocument();
  });

  it('renders recommendations correctly', () => {
    const mockRecommendations = [
      {
        id: '1',
        title: 'Optimización de Recursos',
        description: 'Mejorar la distribución de recursos en zona norte',
        priority: 'high' as const,
        zone: 'Norte'
      },
      {
        id: '2',
        title: 'Mantenimiento Preventivo',
        description: 'Realizar mantenimiento en infraestructura crítica',
        priority: 'medium' as const,
        zone: 'Centro'
      },
    ];

    render(<Recomendaciones recommendations={mockRecommendations} />);

    // Check titles
    expect(screen.getByText('Optimización de Recursos')).toBeInTheDocument();
    expect(screen.getByText('Mantenimiento Preventivo')).toBeInTheDocument();

    // Check descriptions
    expect(screen.getByText('Mejorar la distribución de recursos en zona norte')).toBeInTheDocument();
    expect(screen.getByText('Realizar mantenimiento en infraestructura crítica')).toBeInTheDocument();

    // Check zones
    expect(screen.getByText('Norte')).toBeInTheDocument();
    expect(screen.getByText('Centro')).toBeInTheDocument();
  });

  it('renders priority styling correctly', () => {
    const mockRecommendations = [
      {
        id: '1',
        title: 'High Priority',
        description: 'Critical issue',
        priority: 'high' as const,
      },
      {
        id: '2',
        title: 'Medium Priority',
        description: 'Important issue',
        priority: 'medium' as const,
      },
      {
        id: '3',
        title: 'Low Priority',
        description: 'Minor issue',
        priority: 'low' as const,
      },
    ];

    render(<Recomendaciones recommendations={mockRecommendations} />);

    // Check that all recommendations are rendered
    expect(screen.getByText('High Priority')).toBeInTheDocument();
    expect(screen.getByText('Medium Priority')).toBeInTheDocument();
    expect(screen.getByText('Low Priority')).toBeInTheDocument();
  });

  it('renders recommendations without zone', () => {
    const mockRecommendations = [
      {
        id: '1',
        title: 'General Recommendation',
        description: 'Applies to all zones',
        priority: 'medium' as const,
      },
    ];

    render(<Recomendaciones recommendations={mockRecommendations} />);

    expect(screen.getByText('General Recommendation')).toBeInTheDocument();
    expect(screen.getByText('Applies to all zones')).toBeInTheDocument();
    // Should not have zone tag
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });

  it('limits display to 3 recommendations and shows count', () => {
    const mockRecommendations = [
      { id: '1', title: 'Rec 1', description: 'Desc 1', priority: 'high' as const },
      { id: '2', title: 'Rec 2', description: 'Desc 2', priority: 'medium' as const },
      { id: '3', title: 'Rec 3', description: 'Desc 3', priority: 'low' as const },
      { id: '4', title: 'Rec 4', description: 'Desc 4', priority: 'high' as const },
      { id: '5', title: 'Rec 5', description: 'Desc 5', priority: 'medium' as const },
    ];

    render(<Recomendaciones recommendations={mockRecommendations} />);

    // Should show first 3 recommendations
    expect(screen.getByText('Rec 1')).toBeInTheDocument();
    expect(screen.getByText('Rec 2')).toBeInTheDocument();
    expect(screen.getByText('Rec 3')).toBeInTheDocument();

    // Should not show 4th and 5th
    expect(screen.queryByText('Rec 4')).not.toBeInTheDocument();
    expect(screen.queryByText('Rec 5')).not.toBeInTheDocument();

    // Should show count of additional recommendations
    expect(screen.getByText('+2 más recomendaciones')).toBeInTheDocument();
  });

  it('does not show additional count when 3 or fewer recommendations', () => {
    const mockRecommendations = [
      { id: '1', title: 'Rec 1', description: 'Desc 1', priority: 'high' as const },
      { id: '2', title: 'Rec 2', description: 'Desc 2', priority: 'medium' as const },
    ];

    render(<Recomendaciones recommendations={mockRecommendations} />);

    expect(screen.queryByText(/más recomendaciones/)).not.toBeInTheDocument();
  });
});