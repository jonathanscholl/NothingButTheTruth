import { supabase } from '@/lib/supabase';
import { Alert } from 'react-native';

export interface Lobby {
  id: string;
  code: string;
  host_id: string;
  created_at: string;
  active: boolean;
  current_photo_url?: string;
}

export const lobbyService = {
  createLobby: async (userId: string): Promise<Lobby | null> => {
    try {
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      const { data, error } = await supabase
        .from('lobbies')
        .insert([
          {
            code,
            host_id: userId,
            active: true
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create lobby';
      Alert.alert('Error', message);
      return null;
    }
  },

  joinLobby: async (code: string, userId: string): Promise<Lobby | null> => {
    try {
      // First check if lobby exists and is active
      const { data: lobby, error: lobbyError } = await supabase
        .from('lobbies')
        .select('*')
        .eq('code', code)
        .eq('active', true)
        .single();

      if (lobbyError) throw new Error('Invalid lobby code or lobby is inactive');

      // Add user to lobby_members
      const { error: memberError } = await supabase
        .from('lobby_members')
        .insert([
          {
            lobby_id: lobby.id,
            user_id: userId
          }
        ]);

      if (memberError) throw memberError;
      return lobby;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to join lobby';
      Alert.alert('Error', message);
      return null;
    }
  },

  updateCurrentPhoto: async (lobbyId: string, photoUrl: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('lobbies')
        .update({ current_photo_url: photoUrl })
        .eq('id', lobbyId);

      if (error) {
        console.error('Error updating lobby photo:', error);
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error in updateCurrentPhoto:', error);
      return false;
    }
  },

  closeLobby: async (lobbyId: string, hostId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('lobbies')
        .update({ active: false })
        .eq('id', lobbyId)
        .eq('host_id', hostId);

      if (error) throw error;
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to close lobby';
      Alert.alert('Error', message);
      return false;
    }
  },

  subscribeToLobby: (lobbyId: string, onPhotoUpdate: (photoUrl: string) => void) => {
    return supabase
      .channel(`lobby:${lobbyId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'lobbies',
          filter: `id=eq.${lobbyId}`
        },
        (payload: any) => {
          if (payload.new.current_photo_url) {
            onPhotoUpdate(payload.new.current_photo_url);
          }
        }
      )
      .subscribe();
  }
}; 