export const TRACK_CONSTANTS = {
    ADD_EXERCISE_BTN: 'Add Exercise',
    ADD_MUSCLE_GROUP_BTN: 'Add Muscle Group',
    ADD_SET_BTN: 'ADD SET',

    ARIA_ADD_EXERCISE: 'Add exercise',
    ARIA_ADD_SET: 'Add set',
    ARIA_REMOVE_EXERCISE: 'Remove exercise',
    ARIA_REMOVE_MUSCLE_GROUP: 'Remove muscle group',
    ARIA_REMOVE_SET: 'Remove set',

    EXERCISE_NAME_LABEL: 'EXERCISE',
    EMPTY_STATE_HEADING: 'Log Your Session',
    EMPTY_STATE_SUBHEADING: "Tap 'Add Muscle Group' to start logging your session.",

    FINALIZE_BTN: 'LOG SESSION',

    KG_LABEL: 'KG',

    MODAL_CANCEL_BTN: 'Cancel',
    MODAL_CONFIRM_BTN: 'Delete',
    MODAL_DELETE_TEXT: 'Are you sure you want to delete this muscle group? All exercises and sets inside it will be lost.',
    MODAL_DELETE_TITLE: 'Delete Muscle Group?',
    MODAL_LAST_EX_TEXT: 'Removing all the exercises will delete this muscle group. Are you sure?',
    MODAL_LAST_EX_TITLE: 'Delete Muscle Group?',
    MODAL_LAST_SET_TEXT: 'Removing all the sets will delete this exercise. Are you sure?',
    MODAL_LAST_SET_TITLE: 'Delete Exercise?',

    MUSCLE_GROUP_LABEL: 'MUSCLE GROUP',
    MUSCLE_GROUP_TYPE: 'muscleGroup',
    PLACEHOLDER_EXERCISE: 'e.g. Barbell Bench Press',
    PLACEHOLDER_MUSCLE_GROUP: 'e.g. Chest',
    REPS_LABEL: 'REPS',
    SET_LABEL: 'SET',
    SUBTITLE: 'LOCK-IN TIME!',
    EDIT_HEADING: 'Edit Workout',
    EDIT_SUBTITLE: "Update today's session",
    UPDATE_FINALIZE_BTN: 'UPDATE WORKOUT',
    LOADING_WORKOUT_TEXT: "Loading today's workout details...",

    ERRORS: {
        NO_MG_NAME: 'Please provide a name for all muscle groups.',
        NO_EXERCISES: (mgName: string) => `Please add at least one exercise for ${mgName}.`,
        NO_EX_NAME: (mgName: string) => `Please provide a name for all exercises under ${mgName}.`,
        NO_SETS: (exName: string) => `Please add at least one set for ${exName}.`,
        INVALID_WEIGHT: (exName: string) => `Please enter a valid weight (greater than 0) for ${exName}.`,
        INVALID_REPS: (exName: string) => `Please enter valid reps (at least 1) for ${exName}.`,
    },
};
