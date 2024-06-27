using SpechToText.Data;
using SpechToText.Features.Chat.Dto;
using SpechToText.Features.Chat.Utilities;
using System.Data.Entity;

namespace SpechToText.Features.Chat
{
    public class ChatService : IChatService
    {
        private readonly ChatDbContext _chatDbContext;
        public ChatService(ChatDbContext chatDbContext)
        {
                _chatDbContext = chatDbContext;
        }
        public async Task<Response> GetTopics()
        {
            var JobInterviewTopics = await _chatDbContext.MessageType.ToListAsync();
            List<TopicsDTO> Topics = new List<TopicsDTO>();
            foreach (var item in JobInterviewTopics)
            {
                Topics.Add(new TopicsDTO { Id = item.RowId, Topic = item.Description });
            }
            return new Response { Message = "Job Interview Topics", Data = Topics };
        }
    }
}
