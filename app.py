import tkinter as tk
from tkinter import Canvas, PhotoImage

# Affirmations
affirmations = [
    "You are capable of amazing things",
    "Today is a fresh start",
    "You bring something special to this world",
    "Believe in your dreams",
    "Your potential is limitless",
    "Take it one step at a time",
    "You are stronger than you think",
    "Positivity is a choice",
    "Your mind is powerful",
    "You are worthy of good things"
]

current_index = 0

# Function to create new sticky notes 
def create_sticky_note():
    # Create a frame that holds both the text and the controls
    note_frame = tk.Frame(root, bg="light yellow", bd=0)
    note_frame.place(x=75, y=175)  # Default position for new notes

    # Text widget inside the frame
    note = tk.Text(note_frame, width=50, height=15, highlightthickness=0.5, bg="light yellow", bd=0, relief="flat")
    note.pack(fill="both", expand=True)

    # Create a frame for the controls (close button) above the Text widget
    controls_frame = tk.Frame(note_frame, bg="light yellow", bd=0)
    controls_frame.pack(side="top", fill="x")

    # Close button (using Label as a button)
    close_button = tk.Label(controls_frame, text="X", bg="red", fg="white", bd=0, padx=5)
    close_button.pack(side="left")
    close_button.bind("<Button-1>", lambda e: note_frame.destroy())  # Bind click event to destroy the note

    # Add a resizer corner (bottom-right) directly to the Text widget
    resizer = tk.Label(note_frame, bg="gray", cursor="sizing")
    resizer.place(relx=1.0, rely=1.0, anchor="se", width=10, height=10)

    # Make the Text widget resizable (only on the resizer)
    resizer.bind("<ButtonPress-1>", lambda event: start_resize(event, note_frame))
    resizer.bind("<B1-Motion>", lambda event: resize(event, note_frame))

    # Bind drag events to the controls_frame instead of the text widget
    controls_frame.bind("<ButtonPress-1>", lambda event: start_drag(event, note_frame))
    controls_frame.bind("<B1-Motion>", lambda event: drag(event, note_frame))

# Start dragging
def start_drag(event, widget):
    widget.drag_start_x = event.x
    widget.drag_start_y = event.y

# Handle dragging motion
def drag(event, widget):
    x = widget.winfo_x() - widget.drag_start_x + event.x
    y = widget.winfo_y() - widget.drag_start_y + event.y
    widget.place(x=x, y=y)

# Start resizing
def start_resize(event, widget):
    widget.resize_start_width = widget.winfo_width()
    widget.resize_start_height = widget.winfo_height()
    widget.resize_start_x = event.x
    widget.resize_start_y = event.y

# Handle resizing motion
def resize(event, widget):
    new_width = widget.resize_start_width + (event.x - widget.resize_start_x)
    new_height = widget.resize_start_height + (event.y - widget.resize_start_y)
    
    # Ensure the new size is at least a minimum size
    if new_width > 25 and new_height > 25:
        widget.place_configure(width=new_width, height=new_height)

# Function to scroll affirmations
def scroll_affirmations():
    global current_index
    affirmation_label.config(text=affirmations[current_index])
    current_index = (current_index + 1) % len(affirmations)
    root.after(10000, scroll_affirmations)

# Function to handle goal clicks
def handle_goal_click(goal_name):
    print(f"{goal_name} Goal Clicked!")  # Replace this with real logic if needed

# Initialize the app
def initialize_app():
    global root, affirmation_label, bg_image
    root = tk.Tk()
    root.title("GoalTracker App")
    root.geometry("1200x600")

    # Load the background image
    bg_image = PhotoImage(file="images/dotgrid.png")

    # Create a canvas to hold the image
    canvas = Canvas(root, width=1000, height=600)
    canvas.pack(fill="both", expand=True)
    canvas.create_image(0, 0, anchor="nw", image=bg_image)

    # Create a label for affirmations and center it
    affirmation_label = tk.Label(root, text="Affirmations will scroll here!", font=("Arial", 14), wraplength=400, bg="white")
    affirmation_label.place(relx=0.5, rely=0.9, anchor="center")

    # Start scrolling affirmations after the label is created
    scroll_affirmations()

    # Create a frame for pinned goals and center it at the top
    goals_frame = tk.Frame(root, bg="white")
    goals_frame.place(relx=0.5, rely=0.2, anchor="center")

    # Create goal buttons
    work_button = tk.Button(goals_frame, text="Work Goal", command=lambda: handle_goal_click("Work"), width=15, height=2)
    work_button.pack(side="left", padx=10)

    home_button = tk.Button(goals_frame, text="Home Goal", command=lambda: handle_goal_click("Home"), width=15, height=2)
    home_button.pack(side="left", padx=10)

    money_button = tk.Button(goals_frame, text="Money Goal", command=lambda: handle_goal_click("Money"), width=15, height=2)
    money_button.pack(side="left", padx=10)

    life_button = tk.Button(goals_frame, text="Life Goal", command=lambda: handle_goal_click("Life"), width=15, height=2)
    life_button.pack(side="left", padx=10)

    # Add Sticky Note Button
    add_note_button = tk.Button(root, text="Add Sticky Note", command=create_sticky_note)
    add_note_button.place(relx=0.05, rely=0.05)

    root.mainloop()

# Start the app
initialize_app()
