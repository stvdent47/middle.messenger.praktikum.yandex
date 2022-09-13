import { User, UserDto } from './user';

export type ChatViewDto = {
  id: number;
  title: string;
  avatar: Nullable<string>;
  created_by: number;
  unread_count: number;
  last_message: Nullable<{
    user: UserDto;
    time: string;
    content: string;
    id: number;
  }>;
};

export class ChatView {
  id: number;
  title: string;
  avatar: Nullable<string>;
  createdBy: number;
  unreadCount: number;
  lastMessage: Nullable<{
    user: User;
    time: Date;
    content: string;
    id: number;
  }>;

  constructor(dto: ChatViewDto) {
    this.id = dto.id;
    this.title = dto.title;
    this.avatar = dto.avatar;
    this.createdBy = dto.created_by;
    this.unreadCount = dto.unread_count;
    this.lastMessage = dto.last_message && {
      user: new User(dto.last_message.user),
      time: new Date(dto.last_message.time),
      content: dto.last_message.content,
      id: dto.last_message.id,
    };
  }
}

export type MessageViewDto = {
  id: number;
  chat_id?: number;
  content: string;
  file: Nullable<FileDto>;
  is_read?: boolean;
  time: string;
  type: string;
  user_id: string;
};

export class MessageView {
  id: number;
  chatId?: number;
  content: string;
  file: Nullable<File>;
  isRead?: boolean;
  time: Date;
  type: string;
  userId: string;

  constructor(dto: MessageViewDto) {
    this.id = dto.id;
    this.chatId = dto.chat_id;
    this.content = dto.content;
    this.file = dto.file && new File(dto.file);
    this.isRead = dto.is_read;
    this.time = new Date(dto.time);
    this.type = dto.type;
    this.userId = dto.user_id;
  }
}

export type FileDto = {
  id: number;
  user_id: string;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export class File {
  id: number;
  userId: string;
  path: string;
  filename: string;
  contentType: string;
  contentSize: number;
  uploadDate: string;

  constructor(dto: FileDto) {
    this.id = dto.id;
    this.userId = dto.user_id;
    this.path = dto.path;
    this.filename = dto.filename;
    this.contentType = dto.content_type;
    this.contentSize = dto.content_size;
    this.uploadDate = dto.upload_date;
  }
}

export type CreateChatInput = {
  title: string;
};

export class CreateChatInputDto {
  title: string;

  constructor(info: CreateChatInput) {
    this.title = info.title;
  }
}

export type DeleteChatInput = {
  chatId: number;
};

export class DeleteChatInputDto {
  chatId: number;

  constructor(info: DeleteChatInputDto) {
    this.chatId = info.chatId;
  }
}

export type AddUserToChatInput = {
  chatId: number;
  users: number[];
};

export class AddUserToChatInputDto {
  chatId: number;
  users: number[];

  constructor(info: AddUserToChatInput) {
    this.chatId = info.chatId;
    this.users = info.users;
  }
}

export type RemoveUserFromChatInput = {
  chatId: number;
  users: number[];
};

export class RemoveUserFromChatInputDto {
  chatId: number;
  users: number[];

  constructor(info: RemoveUserFromChatInput) {
    this.chatId = info.chatId;
    this.users = info.users;
  }
}
