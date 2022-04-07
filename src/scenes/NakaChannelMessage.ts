import { ChannelMessage } from "@heroiclabs/nakama-js";

export default class NakaChannelMessage implements ChannelMessage
{
    channel_id?: string;
    code?: number;
    content?: object;
    create_time?: string;
    group_id?: string;
    message_id?: string;
    persistent?: boolean;
    room_name?: string;
    reference_id?: string;
    sender_id?: string;
    update_time?: string;
    user_id_one?: string;
    user_id_two?: string;
    username?: string;
}