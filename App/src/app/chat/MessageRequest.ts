import { UserPrefences } from "../common/prefences";
import { TextMessage } from "./textMessage";

export class MessageRequest{
    preferences:UserPrefences;
    message:TextMessage;
}