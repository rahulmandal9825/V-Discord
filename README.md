# Discord Clone

A full-stack Discord clone featuring server and channel creation, private and public chats, real-time messaging, and video/audio calling capabilities. Built using Next.js, Prisma, PostgreSQL NEON, Socket.io, Shach, and Livekit.


## Features

- **Server and Channel Creation**: Users can create servers and channels (text, audio, video).
- **User Management**: Server owners can invite users via invite links.
- **Real-time Messaging**: Utilizes Socket.io for real-time messaging.
- **Private Chat**: Private messaging with video call capabilities.
- **Video/Audio Calls**: Powered by Livekit.
- **Amazing UI**: Built with Shach component library.
- **Database**: PostgreSQL NEON managed by Prisma for schema.

## Tech Stack

- **Frontend**: Next.js, Shach
- **Backend**: Node.js, Prisma, Socket.io
- **Database**: PostgreSQL NEON
- **Real-time Communication**: Socket.io, Livekit

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL NEON account

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/discord-clone.git
    cd discord-clone
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your configuration:
    ```env
    DATABASE_URL=your_postgresql_neon_url
    NEXT_PUBLIC_LIVEKIT_URL=your_livekit_url
    NEXT_PUBLIC_LIVEKIT_API_KEY=your_livekit_api_key
    NEXT_PUBLIC_LIVEKIT_API_SECRET=your_livekit_api_secret
    ```

4. **Set up Prisma**:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

5. **Run the development server**:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. **Create a Server**:
   - Click on the "+" button to create a new server.
   - Fill in the server details and click "Create".

2. **Create a Channel**:
   - Within a server, click on the "+" button to create a new channel.
   - Choose the type of channel (text, audio, video) and fill in the details.

3. **Invite Users**:
   - Click on the "Invite" button in the server settings.
   - Share the invite link with users.

4. **Real-time Messaging**:
   - Enter any channel and start sending messages.

5. **Private Chat and Video Calls**:
   - Click on a user to start a private chat.
   - Use the video call button to initiate a video call.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Rahul Mandal - rahul.mandal@example.com

Project Link: [https://github.com/yourusername/discord-clone](https://https://github.com/rahulmandal9825)
