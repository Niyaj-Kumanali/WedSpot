import React, { type ReactElement } from 'react';
import DashboardCard from '../DashboardCard/DashboardCard';
import { ResponsiveContainer } from 'recharts';
import './ChartCard.scss';

interface ChartCardProps {
    title: string;
    subtitle?: string;
    children: ReactElement;
    height?: number | string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, height = 300 }) => {
    return (
        <DashboardCard className="chart-card-container" sx={{ height: '100%' }}>
            <div className="chart-card-header">
                <h3 className="chart-card-title">
                    {title}
                </h3>
                {subtitle && (
                    <p className="chart-card-subtitle">
                        {subtitle}
                    </p>
                )}
            </div>
            <div className="chart-card-body" style={{ height: height }}>
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </DashboardCard>
    );
};

export default ChartCard;
