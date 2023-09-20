type MessageReceived = {
  emisor: {
    id: number;
    phone: string;
    fullName: string;
    dni: string;
  };
  message: {
    id: number;
    description: string;
  };
  latitude: number;
  longitude: number;
};
