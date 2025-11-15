'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';



interface CourseCardProps {
  title: string;
  price: string;
  description: string;
  highlights: string[];
}

export default function CourseCard({
  title,
  price,
  description,
  highlights,
}: CourseCardProps) {
  return (
    <Card
      className={cn(
        'w-full max-w-md mx-auto rounded-2xl shadow-md transition-colors duration-300',
        'bg-white text-neutral-900',
        'dark:bg-neutral-900 dark:text-neutral-100'
      )}
    >
      {/* Header */}
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <div className="flex justify-center items-center mb-4">
          <Badge
            className={cn(
              'text-lg px-4 py-1 rounded-full font-medium',
              'bg-neutral-200 text-neutral-800',
              'dark:bg-neutral-800 dark:text-neutral-100'
            )}
          >
            ₹{price}
          </Badge>
        </div>

        <ul className="space-y-2">
          {highlights.map((point, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
            >
              <span className="text-neutral-700 dark:text-neutral-300 mt-1">
                •
              </span>
              {point}
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          className={cn(
            'px-6 py-2 mt-2 text-sm font-medium border rounded-md',
            'bg-neutral-900 text-white hover:bg-neutral-800',
            'dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200'
          )}
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}
