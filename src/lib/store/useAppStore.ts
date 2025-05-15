import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PropertyType = 'Appartement' | 'Maison' | 'Terrain';

export interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  date: string;
  file?: File;
  fileUrl?: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
  stage: Stage;
  priority: 'low' | 'medium' | 'high';
}

export type Stage = 
  | 'search'
  | 'offer'
  | 'negotiation'
  | 'financing'
  | 'presale'
  | 'notary'
  | 'signing'
  | 'handover';

export interface FinancingDetails {
  loanAmount?: number;
  downPayment?: number;
  interestRate?: number;
  loanTerm?: number;
  monthlyPayment?: number;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
}

export interface PropertyProject {
  id: string;
  name: string;
  propertyType: PropertyType;
  address?: string;
  price?: number;
  size?: number;
  rooms?: number;
  stage: Stage;
  documents: Document[];
  contacts: Contact[];
  tasks: Task[];
  financing: FinancingDetails;
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  projects: PropertyProject[];
  currentProjectId: string | null;
  currentProject: PropertyProject | null;
  addProject: (project: Omit<PropertyProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  setCurrentProject: (projectId: string | null) => void;
  updateProject: (projectId: string, updates: Partial<PropertyProject>) => void;
  deleteProject: (projectId: string) => void;
  
  // Document management
  addDocument: (projectId: string, document: Omit<Document, 'id'>) => void;
  updateDocument: (projectId: string, documentId: string, updates: Partial<Document>) => void;
  deleteDocument: (projectId: string, documentId: string) => void;
  
  // Contact management
  addContact: (projectId: string, contact: Omit<Contact, 'id'>) => void;
  updateContact: (projectId: string, contactId: string, updates: Partial<Contact>) => void;
  deleteContact: (projectId: string, contactId: string) => void;
  
  // Task management
  addTask: (projectId: string, task: Omit<Task, 'id'>) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  completeTask: (projectId: string, taskId: string) => void;
  
  // Financing management
  updateFinancing: (projectId: string, updates: Partial<FinancingDetails>) => void;
  
  // Stage management
  updateStage: (projectId: string, stage: Stage) => void;
}

// Helper to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProjectId: null,
      currentProject: null,
      
      addProject: (projectData) => {
        const newProject: PropertyProject = {
          ...projectData,
          id: generateId(),
          documents: [],
          contacts: [],
          tasks: [],
          financing: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          projects: [...state.projects, newProject],
          currentProjectId: newProject.id,
          currentProject: newProject,
        }));
      },
      
      setCurrentProject: (projectId) => {
        if (!projectId) {
          set({ currentProjectId: null, currentProject: null });
          return;
        }
        
        const project = get().projects.find(p => p.id === projectId) || null;
        set({ currentProjectId: projectId, currentProject: project });
      },
      
      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { ...project, ...updates, updatedAt: new Date().toISOString() } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { ...state.currentProject!, ...updates, updatedAt: new Date().toISOString() }
            : state.currentProject
        }));
      },
      
      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects.filter(project => project.id !== projectId),
          currentProjectId: state.currentProjectId === projectId ? null : state.currentProjectId,
          currentProject: state.currentProjectId === projectId ? null : state.currentProject,
        }));
      },
      
      // Document management
      addDocument: (projectId, documentData) => {
        const newDocument: Document = {
          ...documentData,
          id: generateId(),
        };
        
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  documents: [...project.documents, newDocument],
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                documents: [...state.currentProject!.documents, newDocument],
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      updateDocument: (projectId, documentId, updates) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  documents: project.documents.map(doc =>
                    doc.id === documentId ? { ...doc, ...updates } : doc
                  ),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                documents: state.currentProject!.documents.map(doc =>
                  doc.id === documentId ? { ...doc, ...updates } : doc
                ),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      deleteDocument: (projectId, documentId) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  documents: project.documents.filter(doc => doc.id !== documentId),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                documents: state.currentProject!.documents.filter(doc => doc.id !== documentId),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      // Contact management
      addContact: (projectId, contactData) => {
        const newContact: Contact = {
          ...contactData,
          id: generateId(),
        };
        
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  contacts: [...project.contacts, newContact],
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                contacts: [...state.currentProject!.contacts, newContact],
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      updateContact: (projectId, contactId, updates) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  contacts: project.contacts.map(contact =>
                    contact.id === contactId ? { ...contact, ...updates } : contact
                  ),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                contacts: state.currentProject!.contacts.map(contact =>
                  contact.id === contactId ? { ...contact, ...updates } : contact
                ),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      deleteContact: (projectId, contactId) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  contacts: project.contacts.filter(contact => contact.id !== contactId),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                contacts: state.currentProject!.contacts.filter(contact => contact.id !== contactId),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      // Task management
      addTask: (projectId, taskData) => {
        const newTask: Task = {
          ...taskData,
          id: generateId(),
          completed: false,
        };
        
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  tasks: [...project.tasks, newTask],
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                tasks: [...state.currentProject!.tasks, newTask],
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      updateTask: (projectId, taskId, updates) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  tasks: project.tasks.map(task =>
                    task.id === taskId ? { ...task, ...updates } : task
                  ),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                tasks: state.currentProject!.tasks.map(task =>
                  task.id === taskId ? { ...task, ...updates } : task
                ),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      deleteTask: (projectId, taskId) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  tasks: project.tasks.filter(task => task.id !== taskId),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                tasks: state.currentProject!.tasks.filter(task => task.id !== taskId),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      completeTask: (projectId, taskId) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  tasks: project.tasks.map(task =>
                    task.id === taskId ? { ...task, completed: true } : task
                  ),
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                tasks: state.currentProject!.tasks.map(task =>
                  task.id === taskId ? { ...task, completed: true } : task
                ),
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      // Financing management
      updateFinancing: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  financing: { ...project.financing, ...updates },
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                financing: { ...state.currentProject!.financing, ...updates },
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
      
      // Stage management
      updateStage: (projectId, stage) => {
        set((state) => ({
          projects: state.projects.map(project => 
            project.id === projectId 
              ? { 
                  ...project, 
                  stage,
                  updatedAt: new Date().toISOString()
                } 
              : project
          ),
          currentProject: state.currentProjectId === projectId 
            ? { 
                ...state.currentProject!, 
                stage,
                updatedAt: new Date().toISOString()
              }
            : state.currentProject
        }));
      },
    }),
    {
      name: 'appli-appart-storage',
    }
  )
);