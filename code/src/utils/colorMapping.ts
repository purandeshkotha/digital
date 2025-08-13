// Color mapping utility to ensure Tailwind CSS classes are properly included
export const getColorClasses = (color: string) => {
  const colorMap: Record<string, { bg: string; hover: string; text: string }> = {
    blue: {
      bg: 'bg-blue-500',
      hover: 'hover:bg-blue-600',
      text: 'text-blue-500'
    },
    green: {
      bg: 'bg-green-500',
      hover: 'hover:bg-green-600',
      text: 'text-green-500'
    },
    purple: {
      bg: 'bg-purple-500',
      hover: 'hover:bg-purple-600',
      text: 'text-purple-500'
    },
    orange: {
      bg: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      text: 'text-orange-500'
    },
    red: {
      bg: 'bg-red-500',
      hover: 'hover:bg-red-600',
      text: 'text-red-500'
    },
    yellow: {
      bg: 'bg-yellow-500',
      hover: 'hover:bg-yellow-600',
      text: 'text-yellow-500'
    },
    indigo: {
      bg: 'bg-indigo-500',
      hover: 'hover:bg-indigo-600',
      text: 'text-indigo-500'
    },
    pink: {
      bg: 'bg-pink-500',
      hover: 'hover:bg-pink-600',
      text: 'text-pink-500'
    }
  };

  return colorMap[color] || colorMap.blue;
};