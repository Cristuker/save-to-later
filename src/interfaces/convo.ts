export interface Convo {
  id: string;
  rev: string;
  members: Member[];
  lastMessage: LastMessage;
  muted: boolean;
  unreadCount: number;
}

export interface Member {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  associated?: Associated;
  viewer?: Viewer;
  labels: Label4[];
  chatDisabled: boolean;
}

export interface Associated {
  lists?: number;
  feedgens?: number;
  starterPacks?: number;
  labeler?: boolean;
  chat?: Chat;
}

export interface Chat {
  allowIncoming: string;
}

export interface Viewer {
  muted: boolean;
  mutedByList: MutedByList;
  blockedBy: boolean;
  blocking: string;
  blockingByList: BlockingByList;
  following: string;
  followedBy: string;
  knownFollowers: KnownFollowers;
}

export interface MutedByList {
  uri: string;
  cid: string;
  name: string;
  purpose: string;
  avatar: string;
  listItemCount: number;
  labels: Label[];
  viewer: Viewer2;
  indexedAt: string;
}

export interface Label {
  ver: number;
  src: string;
  uri: string;
  cid: string;
  val: string;
  neg: boolean;
  cts: string;
  exp: string;
  sig: string;
}

export interface Viewer2 {
  muted: boolean;
  blocked: string;
}

export interface BlockingByList {
  uri: string;
  cid: string;
  name: string;
  purpose: string;
  avatar: string;
  listItemCount: number;
  labels: Label2[];
  viewer: Viewer3;
  indexedAt: string;
}

export interface Label2 {
  ver: number;
  src: string;
  uri: string;
  cid: string;
  val: string;
  neg: boolean;
  cts: string;
  exp: string;
  sig: string;
}

export interface Viewer3 {
  muted: boolean;
  blocked: string;
}

export interface KnownFollowers {
  count: number;
  followers: Follower[];
}

export interface Follower {
  did: string;
  handle: string;
  displayName: string;
  avatar: string;
  associated: Associated2;
  labels: Label3[];
  createdAt: string;
}

export interface Associated2 {
  lists: number;
  feedgens: number;
  starterPacks: number;
  labeler: boolean;
  chat: Chat2;
}

export interface Chat2 {
  allowIncoming: string;
}

export interface Label3 {
  ver: number;
  src: string;
  uri: string;
  cid: string;
  val: string;
  neg: boolean;
  cts: string;
  exp: string;
  sig: string;
}

export interface Label4 {
  ver: number;
  src: string;
  uri: string;
  cid: string;
  val: string;
  neg: boolean;
  cts: string;
  exp: string;
  sig: string;
}

export interface LastMessage {}
