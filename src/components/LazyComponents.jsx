import { lazy } from 'react';

export const LazyLessons = lazy(() => import('./Lessons'));
export const LazyPractice = lazy(() => import('./Practice'));
export const LazyProgress = lazy(() => import('./Progress'));
export const LazyAdminPanel = lazy(() => import('./AdminPanel'));
export const LazyCertificate = lazy(() => import('./Certificate'));
export const LazyComputerDesktopSimulation = lazy(() => import('./simulations/ComputerDesktopSimulation'));
export const LazySmartphoneSimulation = lazy(() => import('./simulations/SmartphoneSimulation'));
export const LazyMicrowaveSimulation = lazy(() => import('./simulations/MicrowaveSimulation'));
export const LazyWashingMachineSimulation = lazy(() => import('./simulations/WashingMachineSimulation'));