'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export default function CourseForm() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState(['']);

  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { title, price, description, highlights };
    console.log('Course Data:', courseData);
    alert('Course submitted successfully!');
    setTitle('');
    setPrice('');
    setDescription('');
    setHighlights(['']);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6  transition-colors">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Create a Course</CardTitle>
          <CardDescription>Fill in the course details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="pb-2" htmlFor="title">
                Course Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Fullstack with React"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label className="pb-2" htmlFor="price">
                Price (INR)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="e.g. 999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <Label className="pb-2" htmlFor="description">
                Short Description
              </Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="A short summary about the course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <Label>Course Highlights</Label>
              <div className="space-y-3 mt-2">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <Input
                      placeholder={`Highlight ${index + 1}`}
                      value={highlight}
                      onChange={(e) =>
                        handleHighlightChange(index, e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-10"
                      onClick={() => removeHighlight(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={addHighlight}>
                  Add Highlight
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button type="submit">Create Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
