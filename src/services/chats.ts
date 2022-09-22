import { chatAPI, userAPI } from 'api';
import { Dispatch } from 'core/Store';
import { MessageView, MessageViewDto } from 'models/chat';
import { responseHasError } from 'utils/apiHasError';

export async function getChats(dispatch: Dispatch<AppState>, state: AppState) {
  dispatch({ isLoading: true });

  const response = await chatAPI.getChats();

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  dispatch({ isLoading: false, chats: { ...state.chats, chatList: response } });
}

export async function createChat(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) {
  dispatch({ isLoading: true });

  const response = await chatAPI.createChat({ title: action });

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  await getChats(dispatch, state);
}

export async function deleteChat(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: number,
) {
  dispatch({ isLoading: true });

  const {
    result: { id },
  } = await chatAPI.deleteChat({ chatId: action });

  dispatch({
    isLoading: false,
    // @ts-ignore
    chats: {
      // currentChat: undefined,
      // chatToken: undefined,
      chatList: state.chats.chatList.filter((chat) => chat.id !== id),
    },
  });
}

export async function getChatToken(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) {
  dispatch({ isLoading: true });

  const response = await chatAPI.getChatToken(action);

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  dispatch({
    isLoading: false,
    chats: {
      ...state.chats,
      chatToken: response.token,
    },
  });
}

export async function setCurrentChat(
  dispatch: Dispatch<AppState>,
  state: AppState,
  {
    chatId,
    chatTitle,
  }: {
    chatId: number;
    chatTitle: string;
  },
) {
  dispatch({
    chats: {
      ...state.chats,
      currentChat: { ...state.chats.currentChat, chatId, chatTitle },
    },
  });
}

export async function getChatUsers(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: number,
) {
  dispatch({ isLoading: true });

  const response = await chatAPI.getChatUsers(String(action));

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({
    chats: {
      ...state.chats,
      currentChat: {
        ...state.chats.currentChat,
        users: response,
      },
    },
  });
}

export async function addUserToChat(
  dispatch: Dispatch<AppState>,
  state: AppState,
  {
    chatId,
    userLogin,
  }: {
    chatId: number;
    userLogin: string;
  },
) {
  dispatch({ isLoading: true });

  const responseUser = await userAPI.getUserIdByLogin(userLogin);

  if (responseHasError(responseUser)) {
    dispatch({ isLoading: false });
    return;
  }

  const response = await chatAPI.addUserToChat({
    chatId,
    users: [responseUser.id],
  });

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  dispatch({
    isLoading: false,
    chats: {
      ...state.chats,
      currentChat: {
        ...state.chats.currentChat,
        // TODO — сделать сортировку пользователей
        users: [responseUser, ...state.chats.currentChat.users],
      },
    },
  });
}

export async function removeUserFromChat(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: number,
) {
  dispatch({ isLoading: true });

  const response = await chatAPI.removeUserFromChat({
    chatId: state.chats.currentChat.chatId,
    users: [action],
  });

  if (responseHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  dispatch({
    isLoading: false,
    chats: {
      ...state.chats,
      currentChat: {
        ...state.chats.currentChat,
        users: state.chats.currentChat.users.filter(
          (user) => user.id !== action,
        ),
      },
    },
  });
}

export async function establishConnection(
  dispatch: Dispatch<AppState>,
  state: AppState,
) {
  const { token } = await chatAPI.getChatToken(
    String(state.chats.currentChat.chatId),
  );

  const ws = new WebSocket(
    `wss://ya-praktikum.tech/ws/chats/${state.user?.id}/${state.chats.currentChat.chatId}/${token}`,
  );

  ws.addEventListener('open', () => {
    console.info('Соединение установлено');

    dispatch({ ws });

    ws.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  });

  ws.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.info('Соединение закрыто чисто');
    } else {
      console.info('Обрыв соединения');
    }

    console.info(`Код: ${event.code} | Причина: ${event.reason}`);
  });

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    console.info('Получены данные', { data });

    if (Array.isArray(data)) {
      const filteredMessages =
        data.filter((message: any) => message.content) || [];
      const messages = filteredMessages
        .map((dto: MessageViewDto) => new MessageView(dto))
        .sort((a, b) => b.id - a.id);

      dispatch({
        messages,
      });

      return;
    }
    // TODO — сделать онлайн юзера
    if (
      data.type === 'user connected' ||
      data.type === 'pong' ||
      !data.content
    ) {
      return;
    }

    if (data.type === 'message' && data.content) {
      dispatch({
        messages: [...window.store.getState().messages, new MessageView(data)],
      });
    }
  });

  ws.addEventListener('error', (event) => {
    // @ts-ignore
    console.error('Ошибка', event.message);
  });

  setInterval(() => {
    ws.send(
      JSON.stringify({
        type: 'ping',
      }),
    );
  }, 15_000);
}

export async function sendMessage(
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: string,
) {
  if (!state.ws) {
    return;
  }

  state.ws.send(
    JSON.stringify({
      content: action,
      type: 'message',
    }),
  );
  // TODO — обновлять список чатов: подменять последнее сообщение + поднимать чат в списке чатов
  getChats(dispatch, state);
  // const currentChat = state.chats.chatList.find(
  //   (chat) => chat.id === state.chats.currentChat.chatId,
  // );

  // dispatch({
  //   chats: {
  //     ...state.chats,
  //     chatList: [
  //       ...state.chats.chatList.map((chat) =>
  //         chat.id === state.chats.currentChat.chatId
  //           ? ({
  //               ...currentChat,
  //               lastMessage: { ...currentChat?.lastMessage, content: action },
  //             } as ChatView)
  //           : chat,
  //       ),
  //     ],
  //   },
  // });
}
