package by.reference.service.dao;


import javax.persistence.*;

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    @Column
    private String fullName;

    @Column
    private String note;


    @ManyToOne
    private Department department;

    @ManyToOne
    private Profession profession;


    public Employee(Long id, String fullName, String note, Department department, Profession profession) {
        this.id = id;
        this.fullName = fullName;
        this.note = note;
        this.department = department;
        this.profession = profession;
    }

    public Employee() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Profession getProfession() {
        return profession;
    }

    public void setProfession(Profession profession) {
        this.profession = profession;
    }


}
