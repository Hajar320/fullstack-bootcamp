"""
Flask crud backend
"""

from flask import Flask, jsonify, request

app = Flask(__name__)


students = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 20,
        "gender": "male",
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 21,
        "gender": "female",
    },
    {
        "id": 3,
        "name": "Jim Doe",
        "email": "jim.doe@example.com",
        "age": 22,
        "gender": "male",
    },
    {
        "id": 4,
        "name": "Jill Doe",
        "email": "jill.doe@example.com",
        "age": 23,
        "gender": "female",
    },
    {
        "id": 5,
        "name": "Jack Doe",
        "email": "jack.doe@example.com",
        "age": 24,
        "gender": "male",
    }
]


@app.route("/students")
def get_students():
    """ Index route """

    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    start_index = (page - 1) * limit
    end_index = start_index + limit
    students_data = students[start_index:end_index]

    return jsonify({"students": students_data, "page": page, "limit": limit})

@app.route("/students/gender/<string:gender>")
def get_students_by_gender(gender):
    filtered_students = [student for student in students 
                        if student["gender"].lower() == gender.lower()]
    
    return jsonify({
        "students": filtered_students,
        "count": len(filtered_students),
        "gender": gender
    })

@app.route("/students/<int:student_id>")
def get_student(student_id):
    """ Get a student by id """
    student = next(
        (student for student in students
         if student["id"] == student_id),
        None
    )

    return jsonify(student)


@app.route("/students", methods=["POST"])
def create_student():
    """ Create a student """
    student_id = max(student["id"] for student in students) + 1
    data = request.json
    data["id"] = student_id
    students.append(data)
    return jsonify(data)


@app.route("/students/<int:student_id>", methods=["PUT"])
def update_student(student_id):
    """ Update a student """
    data = request.json
    student = next(
        (student for student in students if student["id"] == student_id), None
    )

    student.update(data)

    return jsonify(student)


@app.route("/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id):
    """ Delete a student """
    student = next(
        (student for student in students if student["id"] == student_id), None)
    students.remove(student)

    return jsonify(student)


@app.errorhandler(404)
def not_found(e):
    """ Handle 404 errors """
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(Exception)
def handle_exception(e):
    """ Handle Exception errors """
    return jsonify({"error": "An error occurred", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)

