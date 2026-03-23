"use client";

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Typography, Empty, Space } from 'antd';
import { Event } from '@/types';
import { dataStore } from '@/lib/data-store';

const { Title, Text } = Typography;

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = () => {
      try {
        const storedEvents = dataStore.events.getAll();
        setEvents(storedEvents);
      } catch (error) {
        console.error('Failed to fetch events from localStorage:', error);
        // Optionally, display an error message to the user
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    const newEvent: Omit<Event, 'id' | 'guestIds' | 'taskIds'> = {
      name: `New Event ${events.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      time: '18:00',
      location: 'Virtual',
      description: 'A newly created event.',
    };
    const createdEvent = dataStore.events.create(newEvent);
    setEvents((prev) => [...prev, createdEvent]);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Title level={3}>Loading events...</Title></div>;
  }

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Your Events</Title>
        <Button type="primary" size="large" onClick={handleCreateEvent}>
          Create New Event
        </Button>
      </div>

      {events.length === 0 ? (
        <Empty
          description={
            <span className="text-gray-500">No events planned yet. Start by creating one!</span>
          }
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" onClick={handleCreateEvent}>Create Event</Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {events.map((event) => (
            <Col xs={24} sm={12} md={8} lg={6} key={event.id}>
              <Card
                title={event.name}
                bordered={false}
                className="shadow-md hover:shadow-lg transition-shadow duration-300"
                actions={[
                  <Button key="view" type="link">View Details</Button>, // Placeholder for navigation
                  <Button key="edit" type="link">Edit</Button>, // Placeholder for edit functionality
                  <Button key="delete" type="link" danger>Delete</Button>, // Placeholder for delete functionality
                ]}
              >
                <Space direction="vertical" size="small" className="w-full">
                  <Text strong>Date:</Text> <Text>{event.date}</Text>
                  <Text strong>Time:</Text> <Text>{event.time}</Text>
                  <Text strong>Location:</Text> <Text>{event.location}</Text>
                  <Text strong>Description:</Text> <Text className="line-clamp-2">{event.description}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
}
