export interface ResponseListNotifications {
  cursor: string;
  notifications: Notification[];
  priority: boolean;
  seenAt: string;
}

export interface Notification {
  uri: string;
  cid: string;
  author: Author;
  reason: string;
  reasonSubject?: string;
  record: Record | {};
  isRead: boolean;
  indexedAt: string;
}

export interface Author {
  did: string;
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  indexedAt?: string;
  createdAt?: string;
}

export interface Record {
  $type: string
  createdAt: string
  facets: Facet[]
  langs: string[]
  reply: Reply
  text: string
}

export interface Facet {
  $type: string
  features: Feature[]
  index: Index
}

export interface Feature {
  $type: string
  did: string
}

export interface Index {
  byteEnd: number
  byteStart: number
}

export interface Reply {
  parent: Parent
  root: Root3
}

export interface Parent {
  cid: string
  uri: string
}

export interface Root3 {
  cid: string
  uri: string
}
