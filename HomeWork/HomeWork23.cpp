#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <memory>

using namespace std;

class Resident {
    string name;
    int age;
    string gender;
public:
    Resident(const string& name, int age, const string& gender)
        : name(name), age(age), gender(gender) {}

    friend ostream& operator<<(ostream& os, const Resident& resident) {
        os << "  Name: " << resident.name << ", Age: " << resident.age
            << ", Gender: " << resident.gender;
        return os;
    }
};

class Room {
protected:
    int roomCount;
    double area;
    string address;
    vector<Resident> residents;
public:
    Room(int roomCount, double area, const string& address)
        : roomCount(roomCount), area(area), address(address) {}

    virtual ~Room() {}

    void addResident(const Resident& resident) {
        residents.push_back(resident);
    }

    virtual void display() const = 0;

    friend ostream& operator<<(ostream& os, const Room& room) {
        os << "Rooms: " << room.roomCount << ", Area: " << room.area
            << ", Address: " << room.address << "\nResidents:\n";
        for (const auto& resident : room.residents) {
            os << resident << "\n";
        }
        return os;
    }
};

class Apartment : public Room {
    int entrance;
    int floor;
    int apartmentNumber;
public:
    Apartment(int roomCount, double area, const string& address, int entrance, int floor, int apartmentNumber)
        : Room(roomCount, area, address), entrance(entrance), floor(floor), apartmentNumber(apartmentNumber) {}

    void display() const override {
        cout << *this;
        cout << "Entrance: " << entrance << ", Floor: " << floor
            << ", Apartment Number: " << apartmentNumber << "\n";
    }
};

class PrivateHouse : public Room {
    double yardArea;
public:
    PrivateHouse(int roomCount, double area, const string& address, double yardArea)
        : Room(roomCount, area, address), yardArea(yardArea) {}

    void display() const override {
        cout << *this;
        cout << "Yard Area: " << yardArea << "\n";
    }
};

class Cottage : public Room {
    int bathrooms;
    int sleepingPlaces;
public:
    Cottage(int roomCount, double area, const string& address, int bathrooms, int sleepingPlaces)
        : Room(roomCount, area, address), bathrooms(bathrooms), sleepingPlaces(sleepingPlaces) {}

    void display() const override {
        cout << *this;
        cout << "Bathrooms: " << bathrooms << ", Sleeping Places: " << sleepingPlaces << "\n";
    }
};

class Hotel : public Room {
    int numberOfRooms;
    double highestPrice;
    double lowestPrice;
public:
    Hotel(int roomCount, double area, const string& address, int numberOfRooms, double highestPrice, double lowestPrice)
        : Room(roomCount, area, address), numberOfRooms(numberOfRooms), highestPrice(highestPrice), lowestPrice(lowestPrice) {}

    void display() const override {
        cout << *this;
        cout << "Number of Rooms: " << numberOfRooms
            << ", Highest Price: " << highestPrice
            << ", Lowest Price: " << lowestPrice << "\n";
    }
};

class Manager {
    vector<shared_ptr<Room>> rooms;
public:
    void addRoom(shared_ptr<Room> room) {
        rooms.push_back(room);
    }

    void loadFromFile(const string& filename) {
        ifstream file(filename);
        if (!file.is_open()) {
            cerr << "Could not open the file: " << filename << endl;
            return;
        }

        string line;
        while (getline(file, line)) {
            if (line.empty()) continue;

            stringstream ss(line);
            string type;
            ss >> type;

            if (type == "Rooms:") {
                int roomCount;
                double area;
                string address;

                ss >> roomCount;
                ss.ignore(); 
                ss >> area; 
                ss.ignore(); 
                getline(ss, address, '"');
                
                if (type == "Apartment") {
                    int entrance, floor, apartmentNumber;
                    ss >> entrance >> floor >> apartmentNumber;
                    addRoom(make_shared<Apartment>(roomCount, area, address, entrance, floor, apartmentNumber));
                }  
            }
        }
        file.close();
    }

    void displayRooms() const {
        for (const auto& room : rooms) {
            room->display();
            cout << endl;
        }
    }
};

int main() {
    Manager manager;

    manager.addRoom(make_shared<Apartment>(2, 75, "123 Main St", 1, 3, 45));
    manager.addRoom(make_shared<PrivateHouse>(3, 150, "456 Elm St", 500));
    manager.addRoom(make_shared<Cottage>(4, 200, "789 Oak St", 2, 6));
    manager.addRoom(make_shared<Hotel>(5, 300, "101 Pine St", 20, 500, 100));

    cout << "Current Rooms:\n";
    manager.displayRooms();

    manager.loadFromFile("rooms.txt");
    cout << "\nAfter loading from file:\n";
    manager.displayRooms();
}
