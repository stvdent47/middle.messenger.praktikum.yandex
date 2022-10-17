import HTTPTransport from 'core/HTTPTransport';
import {
  AddUserToChatInput,
  AddUserToChatInputDto,
  ChatView,
  ChatViewDto,
  CreateChatInput,
  CreateChatInputDto,
  DeleteChatInput,
  DeleteChatInputDto,
  RemoveUserFromChatInput,
  RemoveUserFromChatInputDto,
} from 'models/chat';
import { User, UserDto } from 'models/user';

const options = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const chatAPI = {
  getChats: async () => {
    try {
      const { response } = await HTTPTransport.get('/chats', { ...options });

      return (JSON.parse(response) || []).map(
        (dto: ChatViewDto) => new ChatView(dto),
      );
    } catch (err) {
      console.error({ err });
    }
  },

  createChat: async (data: CreateChatInput) => {
    try {
      const { response } = await HTTPTransport.post('/chats', {
        ...options,
        data: JSON.stringify(new CreateChatInputDto(data)),
      });

      return JSON.parse(response);
    } catch (err) {
      console.error({ err });
    }
  },

  deleteChat: async (data: DeleteChatInput) => {
    try {
      const { response } = await HTTPTransport.delete('/chats', {
        ...options,
        data: JSON.stringify(new DeleteChatInputDto(data)),
      });

      return JSON.parse(response);
    } catch (err) {
      console.error({ err });
    }
  },

  getChatToken: (chatId: string) =>
    HTTPTransport.post(`/chats/token/${chatId}`, { ...options }).then(
      ({ response }) => JSON.parse(response),
    ),

  getChatUsers: (chatId: string) =>
    HTTPTransport.get(`/chats/${chatId}/users`, { ...options }).then(
      ({ response }) =>
        (JSON.parse(response) || []).map((dto: UserDto) => new User(dto)),
    ),

  addUserToChat: (data: AddUserToChatInput) =>
    HTTPTransport.put('/chats/users', {
      ...options,
      data: JSON.stringify(new AddUserToChatInputDto(data)),
    }),

  removeUserFromChat: (data: RemoveUserFromChatInput) =>
    HTTPTransport.delete('/chats/users', {
      ...options,
      data: JSON.stringify(new RemoveUserFromChatInputDto(data)),
    }),
};
