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
  occurredAt: Date;
};

type User = {
  Id: number;
  FullName: string;
  Dni: string;
  Email: string;
  Phone: string;
  RoleId: number;
  Role: {
    id: number;
    name: string;
    description: string;
  };
};

type Message = {
  id: number;
  description: string;
};
