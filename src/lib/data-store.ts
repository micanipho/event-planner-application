import { generateId, getLocalStorageItem, setLocalStorageItem } from './utils';
import { Event, Guest, Task, RSVPStatus } from '@/types';

interface CRUDStore<T extends { id: string }> {
  getAll: () => T[];
  getById: (id: string) => T | undefined;
  create: (item: Omit<T, 'id'>) => T;
  update: (id: string, updates: Partial<T>) => T | undefined;
  remove: (id: string) => boolean;
}

const createLocalStorageStore = <T extends { id: string }>(key: string): CRUDStore<T> => {
  const getAll = (): T[] => {
    return getLocalStorageItem<T[]>(key) || [];
  };

  const saveAll = (items: T[]): void => {
    setLocalStorageItem(key, items);
  };

  return {
    getAll,
    getById: (id: string): T | undefined => {
      return getAll().find((item) => item.id === id);
    },
    create: (item: Omit<T, 'id'>): T => {
      const newItem = { ...item, id: generateId() } as T;
      const items = getAll();
      items.push(newItem);
      saveAll(items);
      return newItem;
    },
    update: (id: string, updates: Partial<T>): T | undefined => {
      const items = getAll();
      const index = items.findIndex((item) => item.id === id);
      if (index > -1) {
        const updatedItem = { ...items[index], ...updates };
        items[index] = updatedItem;
        saveAll(items);
        return updatedItem;
      }
      return undefined;
    },
    remove: (id: string): boolean => {
      const items = getAll();
      const initialLength = items.length;
      const filteredItems = items.filter((item) => item.id !== id);
      if (filteredItems.length < initialLength) {
        saveAll(filteredItems);
        return true;
      }
      return false;
    },
  };
};

// --- Specific Data Stores for Entities ---

export const dataStore = {
  events: createLocalStorageStore<Event>('events_data') as CRUDStore<Event> & {
    create: (item: Omit<Event, 'id' | 'guestIds' | 'taskIds'>) => Event;
  },
  guests: createLocalStorageStore<Guest>('guests_data'),
  tasks: createLocalStorageStore<Task>('tasks_data'),
};

// Override create for Event to initialize guestIds and taskIds arrays
dataStore.events.create = (item: Omit<Event, 'id' | 'guestIds' | 'taskIds'>): Event => {
  const newItem = { ...item, id: generateId(), guestIds: [], taskIds: [] } as Event;
  const items = dataStore.events.getAll();
  items.push(newItem);
  setLocalStorageItem('events_data', items);
  return newItem;
};

// Helper to link a guest to an event
export const addGuestToEvent = (eventId: string, guestDetails: Omit<Guest, 'id' | 'eventId' | 'rsvpStatus'>): Guest | undefined => {
  const event = dataStore.events.getById(eventId);
  if (!event) return undefined;

  const newGuest = dataStore.guests.create({
    ...guestDetails,
    eventId,
    rsvpStatus: 'Pending' as RSVPStatus, // Default status
  });

  event.guestIds.push(newGuest.id);
  dataStore.events.update(eventId, { guestIds: event.guestIds });
  return newGuest;
};

// Helper to link a task to an event
export const addTaskToEvent = (eventId: string, taskDetails: Omit<Task, 'id' | 'eventId' | 'isCompleted'>): Task | undefined => {
  const event = dataStore.events.getById(eventId);
  if (!event) return undefined;

  const newTask = dataStore.tasks.create({
    ...taskDetails,
    eventId,
    isCompleted: false, // Default status
  });

  event.taskIds.push(newTask.id);
  dataStore.events.update(eventId, { taskIds: event.taskIds });
  return newTask;
};

// Helper to remove a guest and unlink from event
export const removeGuestFromEvent = (eventId: string, guestId: string): boolean => {
  const event = dataStore.events.getById(eventId);
  if (!event) return false;

  const guestRemoved = dataStore.guests.remove(guestId);
  if (guestRemoved) {
    event.guestIds = event.guestIds.filter(id => id !== guestId);
    dataStore.events.update(eventId, { guestIds: event.guestIds });
  }
  return guestRemoved;
};

// Helper to remove a task and unlink from event
export const removeTaskFromEvent = (eventId: string, taskId: string): boolean => {
  const event = dataStore.events.getById(eventId);
  if (!event) return false;

  const taskRemoved = dataStore.tasks.remove(taskId);
  if (taskRemoved) {
    event.taskIds = event.taskIds.filter(id => id !== taskId);
    dataStore.events.update(eventId, { taskIds: event.taskIds });
  }
  return taskRemoved;
};
