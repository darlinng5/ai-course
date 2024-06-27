using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SpechToText.Features.Chat.Utilities;

namespace SpechToText.Features.Chat
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        public ChatController(IChatService chatService)
        {
                _chatService = chatService;
        }
        [HttpGet("GetTopics")]
        public async Task<Response> GetTopics()
        {
            return await _chatService.GetTopics();  
        }
    }
}
