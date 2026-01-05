
export enum Step {
  WELCOME = 'WELCOME',
  DEETS = 'DEETS',
  WALLET = 'WALLET',
  TASKS = 'TASKS',
  SUCCESS = 'SUCCESS'
}

export interface UserData {
  xUsername: string;
  ethAddress: string;
  inviter: string;
  noInviter: boolean;
  tasks: {
    followed: boolean;
    liked: boolean;
    quotedLink: string;
    taggedLink: string;
  };
}

export interface StickerProps {
  src: string;
  top: string;
  left: string;
  size: string;
  rotation: string;
}
