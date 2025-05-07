const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'setup-server') {
        const guild = interaction.guild;

        const categories = {
            '🌀 Spawn Area': ['📥・welcome', '📤・goodbye', '📨・invite-log', '📜・rules'],
            '📚 Information': ['🔐・codes', '📢・announcement', '⚔️・war-note', '📰・official'],
            '🏰 Ragnarok M Clasic': ['🌍・global-chat', '📖・guide', '📸・screenshoot-party', '📩・izin-room', '🤖・snapbot'],
            '🔊 Game Voice': ['🔉・voice room 1', '🔉・voice room 2', '🕳・dungeon room', '⚔️・woe-woc', '🗿・thanatos', '⚔️・mp 6 vs 6', '🛡・12 vs 12'],
            '🎵 Musik Vibes': ['🔍・search-n-play', '🛡・security-bot-log', '🎶・music', '😌・chill'],
            '💼 Vice Room': ['💬・vice-chat', '🔊・vice-room'],
            '📊 Server Stats': ['🛠・setup', '🔊・voice bot =15', '🔊・voice member 145', '🔊・voice all member 160']
        };

        await interaction.reply({ content: '🚧 Membuat struktur server, mohon tunggu...', ephemeral: true });

        for (const [catName, channels] of Object.entries(categories)) {
            const category = await guild.channels.create({ name: catName, type: 4 });
            for (const ch of channels) {
                const isVoice = ch.includes('voice') || ch.includes('🔊') || ch.includes('room');
                await guild.channels.create({
                    name: ch,
                    type: isVoice ? 2 : 0,
                    parent: category.id
                });
            }
        }

        await interaction.editReply('✅ Struktur server berhasil dibuat!');
    }
});

client.login(process.env.TOKEN);
