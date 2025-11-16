'use client';

import { createCourse } from '@/app/apis/apis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash } from 'lucide-react';
import { FieldArrayPath, useFieldArray, useForm } from 'react-hook-form';

export interface CourseFormType {
  title: string;
  price: string;
  shortDescription: string;
  courseHighlight: string[];
}

export default function CourseForm() {
  const { register, handleSubmit, reset, control } = useForm<CourseFormType>({
    defaultValues: {
      title: '',
      price: '',
      shortDescription: '',
      courseHighlight: [''],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courseHighlight' as FieldArrayPath<CourseFormType>,
  });
  const onSubmit = async (data: CourseFormType) => {
    try {
      console.log('Sending Course Data:', data);

      const res = await createCourse(data);

      console.log('API Response:', res);

      alert('Course Created Successfully!');

      reset({
        title: '',
        price: '',
        shortDescription: '',
        courseHighlight: [''],
      });
    } catch (error) {
      console.error('Error Creating Course:', error);
      alert('Failed to create course');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Create a Course</CardTitle>
          <CardDescription>Fill in the course details below.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <Label className="pb-2" htmlFor="title">
                Course Title
              </Label>
              <Input id="title" placeholder="e.g. Fullstack with React" {...register('title')} />
            </div>

            {/* Price */}
            <div>
              <Label className="pb-2" htmlFor="price">
                Price (INR)
              </Label>
              <Input id="price" type="number" placeholder="e.g. 999" {...register('price')} />
            </div>

            {/* Short Description */}
            <div>
              <Label className="pb-2" htmlFor="shortDescription">
                Short Description
              </Label>
              <Textarea
                id="shortDescription"
                rows={4}
                placeholder="A short summary about the course"
                {...register('shortDescription')}
              />
            </div>

            {/* Course Highlights */}
            <div>
              <Label>Course Highlights</Label>
              <div className="space-y-3 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-start">
                    <Input
                      placeholder={`Highlight ${index + 1}`}
                      {...register(`courseHighlight.${index}` as const)}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10"
                      onClick={() => remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button type="button" onClick={() => append('')}>
                  Add Highlight
                </Button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end">
              <Button type="submit">Create Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
