-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    rank TEXT DEFAULT 'Bronze',
    coins INTEGER DEFAULT 250,
    xp INTEGER DEFAULT 150,
    total_matches INTEGER DEFAULT 0,
    win_rate DECIMAL(5,2) DEFAULT 0.00,
    best_subject TEXT DEFAULT 'None',
    profile_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Create game_sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    time_taken INTEGER, -- in seconds
    session_type TEXT NOT NULL, -- 'quick', 'timed', 'practice'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard view
CREATE OR REPLACE VIEW leaderboard AS
SELECT 
    u.id,
    u.username,
    u.rank,
    u.coins,
    u.xp,
    u.total_matches,
    u.win_rate,
    u.best_subject,
    ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.win_rate DESC) as position
FROM users u 
WHERE u.profile_completed = TRUE
ORDER BY u.xp DESC, u.win_rate DESC;

-- Insert default achievements
INSERT INTO achievements (title, description, icon, category, points) VALUES
('Welcome Aboard', 'Complete your profile setup', 'trophy', 'getting_started', 10),
('First Steps', 'Complete your first assessment', 'star', 'progress', 25),
('Quick Learner', 'Answer 10 questions in under 30 seconds', 'zap', 'speed', 50),
('Perfect Score', 'Achieve 100% on any assessment', 'crown', 'excellence', 100),
('Mathematics Master', 'Excel in Mathematics assessments', 'calculator', 'subject', 75),
('Science Genius', 'Excel in Science assessments', 'microscope', 'subject', 75),
('Consistent Performer', 'Maintain a 7-day learning streak', 'shield', 'dedication', 150),
('Hall of Fame', 'Reach top 10 on the leaderboard', 'trophy', 'ranking', 200)
ON CONFLICT DO NOTHING;
