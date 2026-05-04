import { getDataProvider } from "@/src/core/providers/dataProvider";
import type { LoginCredentials } from "@/src/core/interfaces/IDataProvider";
import type {
  UserView,
  FavoritesState,
  WorkoutView,
  RoutineView,
  WorkoutVideoView,
  UserRoutine,
  UserRoutineSession,
  UserWorkoutProgress,
  Streak,
  UserReward,
} from "@/lib/types";

const p = () => getDataProvider();

export const authService = {
  login:          (credentials: LoginCredentials): Promise<UserView>    => p().login(credentials),
  logout:         ():                              Promise<void>         => p().logout(),
  getCurrentUser: ():                              Promise<UserView | null> => p().getCurrentUser(),
};

export const workoutService = {
  getAll:  (params?: { free?: boolean; limit?: number }): Promise<WorkoutView[]>    => p().getWorkouts(params),
  getById: (id: number):                                  Promise<WorkoutView | null> => p().getWorkoutById(id),
  getFree: (limit = 3):                                   Promise<WorkoutView[]>    => p().getWorkouts({ free: true, limit }),
};

export const routineService = {
  getAll:  (params?: { free?: boolean; limit?: number }): Promise<RoutineView[]>    => p().getRoutines(params),
  getById: (id: number):                                  Promise<RoutineView | null> => p().getRoutineById(id),
  getFree: (limit = 2):                                   Promise<RoutineView[]>    => p().getRoutines({ free: true, limit }),
};

export const videoService = {
  getAll:  (params?: { free?: boolean; limit?: number }): Promise<WorkoutVideoView[]>    => p().getVideos(params),
  getById: (id: number):                                  Promise<WorkoutVideoView | null> => p().getVideoById(id),
  getFree: (limit = 2):                                   Promise<WorkoutVideoView[]>    => p().getVideos({ free: true, limit }),
};

export const favoritesService = {
  get:  ():                              Promise<FavoritesState> => p().getFavorites(),
  save: (f: FavoritesState):            Promise<void>           => p().saveFavorites(f),
};

export const userRoutineService = {
  getByUser: (userId: number):          Promise<UserRoutine[]>  => p().getUserRoutines(userId),
};

export const sessionService = {
  getByUserRoutine: (userRoutineId: number): Promise<UserRoutineSession[]> => p().getSessions(userRoutineId),
};

export const progressService = {
  getBySession: (sessionId: number):    Promise<UserWorkoutProgress[]> => p().getProgress(sessionId),
};

export const streakService = {
  getByUser: (userId: number):          Promise<Streak | null>  => p().getStreak(userId),
};

export const rewardService = {
  getByUser: (userId: number):          Promise<UserReward[]>   => p().getUserRewards(userId),
};
