

using SpechToText.Features.Chat.Utilities;

namespace SpechToText.Features.Chat
{
    public interface IChatService
    {
        public Task<Response> GetTopics();
    }
}
